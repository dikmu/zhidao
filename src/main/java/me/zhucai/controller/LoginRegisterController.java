package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.email.TencentEnterpriseMailService;
import me.zhucai.service.impl.UserInfoService;
import me.zhucai.util.MyRandomUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginRegisterController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    private TencentEnterpriseMailService tencentEnterpriseMailService;

    @PostMapping("/user/register2")
    public String createUser(Model model, @RequestBody JSONObject jsonObject, HttpServletRequest request) {
        JSONObject result = new JSONObject();
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
            model.addAttribute("code", "error");
            model.addAttribute("msg", "Registration information is incomplete");
            return "/login#signup";
        }
//        username = username.trim();
//        password = password.trim();
//        UserInfo userInfo = new UserInfo();
//        userInfo.setUsername(username);
//        String[] passSalts = ShiroUtil.genSaltedMd5Password(password);
//        userInfo.setPassword(passSalts[0]);
//        userInfo.setSalt(passSalts[1]);
//        userInfo.setState(LookupUtil.USER_STATUS_NEW);
//        //todo 临时测试，应该去掉记录password
//        userInfo.setDescription(password);
//        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
//        userInfo.setUid(uuid);
//        result.put("code", "ok");
//        result.put("msg", "注册成功，请尽快前往邮箱激活账户");
//        sendRegisterEmail(username);
        throw new RuntimeException("aaaaaaaaa");
    }

    //username:email
    private void sendRegisterEmail(String username) {
        //for debug
        if (username.indexOf("@test.com") > 0) {
            username = "muhongdi@qq.com";
        }
        int code = MyRandomUtil.genRandomInt(4);
        tencentEnterpriseMailService.send("skybook", "注册验证码" + code, "注册验证码:" + code, username, null);
    }

}
