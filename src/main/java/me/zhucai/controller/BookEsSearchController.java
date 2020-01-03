package me.zhucai.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.UserEvent;
import me.zhucai.bean.UserInfo;
import me.zhucai.config.UserEventOpt;
import me.zhucai.mapper.UserEventMapper;
import me.zhucai.service.UserEventService;
import me.zhucai.util.ResponseUtil;
import me.zhucai.util.SecurityConfig;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/rest")
public class BookEsSearchController {

    private static final Logger logger = LogManager.getLogger(BookEsSearchController.class);

    //搜索content
    public static final String ES_CONTENT_QUERY_STRING1 = "{\"size\":10,\"from\":QUERY_FROM,\"highlight\":{\"fields\":{\"Content\":{}}},\"_source\":{\"exclude\":[\"Content\"]},\"query\":{\"bool\":{\"must\":[{\"match\":{\"Content\":\"QUERY_CONTENT\"}}]}}}";
    //搜索title+content
    public static final String ES_CONTENT_QUERY_STRING2 = "{\"size\":10,\"from\":QUERY_FROM,\"highlight\":{\"fields\":{\"Content\":{}}},\"_source\":{\"exclude\":[\"Content\"]},\"query\":{\"bool\":{\"must\":[{\"match\":{\"Title\":\"QUERY_TITLE\"}},{\"match\":{\"Content\":\"QUERY_CONTENT\"}}]}}}";
    //搜索title
    public static final String ES_CONTENT_QUERY_STRING3 = "{\"size\":10,\"from\":QUERY_FROM,\"highlight\":{\"fields\":{\"Content\":{}}},\"_source\":{\"exclude\":[\"Content\"]},\"query\":{\"bool\":{\"must\":[{\"match\":{\"Title\":\"QUERY_TITLE\"}}]}}}";

    @Autowired
    UserEventService UserEventService;

    @Autowired
    UserEventMapper userEventMapper;

    @Value("${address.es.epub}")
    private String EsEpubAddress;

//    @Autowired
//    private StringRedisTemplate stringRedisTemplate;


    private RestTemplate restTemplate = new RestTemplate();

    private boolean checkInputParams(JSONObject paramJson) {
        if (paramJson == null) {
            logger.error("参数错误,paramJson:" + paramJson);
            return false;
        } else {
            return true;
        }
    }

    @GetMapping("/rest/test")
    public String test() {
//        stringRedisTemplate.convertAndSend("chat", "Hello from Redis!");
        return "" + Math.random();
    }

    private String setOptHow(String title, String content) {
        JSONObject optHowJson = new JSONObject();
        optHowJson.put("t", title);
        optHowJson.put("c", content);
        return optHowJson.toJSONString();
    }


    /**
     * page BookEsSearch's search method
     *
     * @param request
     * @param paramJson
     * @return
     */
    @RequiresAuthentication
    @PostMapping("/book/es/search")
    public ResponseEntity bookEsSearch(HttpServletRequest request, @RequestBody JSONObject paramJson) {
        logger.info("BookEsSearchController bookEsSearch");
        //验证权限及使用次数限制
        Subject subject = SecurityUtils.getSubject();
        UserInfo userInfo = (UserInfo) subject.getPrincipal();

        //参数合法性判断
        if (!checkInputParams(paramJson)) {
            return ResponseUtil.inputParamError();
        }
        //提取查询参数
        String content = paramJson.getString("text");
        String title = paramJson.getString("title");
        Integer from = paramJson.getInteger("from");
        if (from == null) {
            from = 0;
        }
        //UserEvent 操作记录
        String optHowJson = setOptHow(title, content);

        //用户当日已经搜索内容，不重复记录，以防翻页操作产生记录
        Set<String> currentDaySearch = new HashSet<>();
        if (!subject.hasRole("admin")) {
            String userId = userInfo.getUid();
            List<UserEvent> userEvents = UserEventService.userDailyEsSearchEvent(userId);
            //当日搜索内容
            for (UserEvent userEvent : userEvents) {
                currentDaySearch.add(userEvent.getOptHow());
            }
            int optTimes = currentDaySearch.size();
            if (subject.hasRole("vip")) {
                if (optTimes >= SecurityConfig.USER_EVENT_OPT_ES_SEARCH_TIMES_VIP) {
                    logger.info("超过VIP账号每日可查询次数（100次），感谢您对本产品的喜爱，请明日继续使用");
                    return ResponseEntity.status(403).body("超过VIP账号每日可查询次数（100次），感谢您对本产品的喜爱，请明日继续使用");
                }
            } else {
                if (optTimes >= SecurityConfig.USER_EVENT_OPT_ES_SEARCH_TIMES_GUEST) {
                    logger.info("超过非VIP账号每日可查询次数（10次），感谢您对本产品的喜爱，请明日继续使用");
                    return ResponseEntity.status(403).body("超过非VIP账号每日可查询次数（10次），感谢您对本产品的喜爱，请明日继续使用");
                }
            }
        }

        //选择template
        String template = null;
        if (StringUtils.isNotBlank(content) && StringUtils.isNotBlank(title)) {
            template = ES_CONTENT_QUERY_STRING2.replace("QUERY_FROM", "" + from).replace("QUERY_CONTENT", content).replace("QUERY_TITLE", title);
        } else if (StringUtils.isNotBlank(content)) {
            template = ES_CONTENT_QUERY_STRING1.replace("QUERY_FROM", "" + from).replace("QUERY_CONTENT", content);
        } else if (StringUtils.isNotBlank(title)) {
            template = ES_CONTENT_QUERY_STRING3.replace("QUERY_FROM", "" + from).replace("QUERY_TITLE", title);
        } else {
            logger.error("未知异常");
            logger.error("paramJson:" + paramJson);
            throw new RuntimeException("未知异常");
        }
        //
        JSONObject jsonObject = JSONObject.parseObject(template);
        HttpEntity<JSONObject> esRequest = new HttpEntity<>(jsonObject);
        //转发到 local ES url : http://localhost:9200/store/epub/_search
        try {
            ResponseEntity responseEntity = restTemplate.postForEntity(EsEpubAddress, esRequest, String.class);
            if (responseEntity.getStatusCode().value() == 200) {
                //记录操作
                try {
                    if (!currentDaySearch.contains(optHowJson)) {
                        UserEvent userEvent = new UserEvent();
                        userEvent.setUserId(userInfo.getUid());
                        userEvent.setOpt(UserEventOpt.ES_SEARCH);
                        userEvent.setOptHow(optHowJson);
                        userEvent.setOptPlace(request.getRemoteAddr());
                        userEvent.setOptTime(new Date());
                        userEventMapper.insert(userEvent);
                    } else {
                        logger.info("执行重复查询：" + optHowJson);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    logger.error(e.getMessage());
                    logger.error("记录用户操作异常 (错误173)");
                    return ResponseEntity.status(500).body("模糊查询服务异常，管理员正在处理，请稍候再试 (错误173)");
                }
                //
                return responseEntity;
            } else {
                logger.error("redirect to ES error");
                logger.error("模糊查询服务异常，管理员正在处理，请稍候再试（错误182）");
                logger.error(template);
                logger.error(responseEntity);
                return ResponseEntity.status(500).body("模糊查询服务异常，管理员正在处理，请稍候再试 （错误182）");
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        logger.error("服务繁忙，请稍候再试");
        return ResponseEntity.status(500).body("服务繁忙，请稍候再试");
    }

    /**
     * 热词搜索
     *
     * @return {
     * 1：登录人，最近查询词汇
     * 2：全部最近查询词汇
     * }
     */
    @RequiresAuthentication
    @GetMapping("/book/es/hot")
    public ResponseEntity userHotSearch() {
        Subject subject = SecurityUtils.getSubject();
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        String curDateStartStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<UserEvent> userEvents = userEventMapper.userRecentSearchHistory(userInfo.getUid(), UserEventOpt.ES_SEARCH);
        List<UserEvent> userEvents2 = userEventMapper.userHotSearch(userInfo.getUid(), UserEventOpt.ES_SEARCH);
        JSONObject result = new JSONObject();
        JSONArray arr1 = new JSONArray();
        //todo 改为ES存储查询
        for (UserEvent userEvent : userEvents) {
            if (arr1.indexOf(userEvent.getOptHow()) == -1) {
                arr1.add(userEvent.getOptHow());
            }
        }
        JSONArray arr2 = new JSONArray();
        for (UserEvent userEvent2 : userEvents2) {
            JSONObject hotJson = JSONObject.parseObject(userEvent2.getOptHow());
            String t = hotJson.getString("t");//t:title
            String c = hotJson.getString("c");//c:content
            if (StringUtils.isNotBlank(t) && arr2.indexOf(t) == -1) {
                arr2.add(t);
            }
            if (StringUtils.isNotBlank(c) && arr2.indexOf(c) == -1) {
                arr2.add(c);
            }
        }
        result.put("1", arr1);
        result.put("2", arr2);
        return ResponseEntity.status(200).contentType(MediaType.APPLICATION_JSON).body(result);
    }

}
