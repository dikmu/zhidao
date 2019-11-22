package me.zhucai.controller;

import me.zhucai.bean.UserInfo;
import me.zhucai.service.BusinessData;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Controller
public class PageController {

    public static final String PAGE_ID_BOOK_TITLE_SEARCH = "BookTitleSearch";
    public static final String PAGE_ID_BOOK_ES_SEARCH = "BookEsSearch";
    public static final String PAGE_ID_BOOK_DB_SEARCH = "BookDbSearch";
    public static final String PAGE_ID_CLASS_SEARCH = "ClassSearch";
    public static final String PAGE_ID_DISK_FILE_SEARCH = "DiskFileSearch";
    public static final String PAGE_ID_BUY_KNOWLEDGE_SEARCH = "BuyKnowledgeSearch";
    public static final String PAGE_ID_BUY_THINGS_SEARCH = "BuyThingsSearch";


    @GetMapping(value = "/")
    public String index0(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("/");
        setCommonMenuNavData(model);
        if (WebUtils.getSavedRequest(request) != null) {
            String url = WebUtils.getSavedRequest(request).getRequestUrl();
            System.out.println("WebUtils.getSavedRequest(request).getRequestUrl()");
            System.out.println(url);
            if (StringUtils.isNotBlank(url) && !"/".equals(url)) {
                response.sendRedirect(url);
            }
        }
        return "/pages/index";
    }


    @GetMapping(value = "/pages/index")
    public String index(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCommonMenuNavData(model);
        if (WebUtils.getSavedRequest(request) != null) {
            String url = WebUtils.getSavedRequest(request).getRequestUrl();
            System.out.println("WebUtils.getSavedRequest(request).getRequestUrl()");
            System.out.println(url);
            if (StringUtils.isNotBlank(url) && !"/pages/index".equals(url)) {
                response.sendRedirect(url);
            }
        }
        return "/pages/index";
    }


//    @GetMapping(value = "/pages/loginSuccess")
//    public String doLoginSuccess(Model model, HttpServletRequest request) {
//        System.out.println("doLoginSuccess");
//        setCommonMenuNavData(model);
//        model.addAttribute("PageId", "index");
//        model.addAttribute("GlobalData", "{a:123,b:456}");
//        String url = WebUtils.getSavedRequest(request).getRequestUrl();
//        System.out.println("WebUtils.getSavedRequest(request).getRequestUrl()");
//        System.out.println(url);
//        if (StringUtils.isBlank(url)) {
//            return "/pages/index";
//        }
//        return url;
//    }

    @GetMapping(value = "/pages/BookTitleSearch")
    public String bookName(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", PAGE_ID_BOOK_TITLE_SEARCH);
        return "/pages/BookEsSearch";
    }

    @GetMapping(value = "/pages/BookEsSearch")
    public String bookEs(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", PAGE_ID_BOOK_ES_SEARCH);
        return "/pages/BookEsSearch";
    }

    @GetMapping(value = "/pages/BookDbSearch")
    public String bookDb(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", PAGE_ID_BOOK_DB_SEARCH);
        return "/pages/BookDbSearch";
    }

//    @PostMapping({"/", "/pages/BookDetail"})
//    public String bookDetail(Model model, @RequestBody JSONObject queryJson) {
//        System.out.println(queryJson);
//        setCommonMenuNavData(model);
//        model.addAttribute("PageId", PAGE_ID_BOOK_DB_SEARCH);
//        return "/pages/BookDetail";
//    }

    @GetMapping(value = "/pages/BuyThingsSearch")
    public String BuyThingsSearch(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", PAGE_ID_BUY_THINGS_SEARCH);
        return "/pages/BuyThingsSearch";
    }


    private void setCommonMenuNavData(Model model) {
        Subject subject = SecurityUtils.getSubject();
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        if (userInfo != null) {
            model.addAttribute("username", userInfo.getUsername());
            model.addAttribute("menus", BusinessData.getSysMenus());
        } else {
            model.addAttribute("username", "未登录");
            model.addAttribute("menus", BusinessData.getSysMenus());
        }
    }

    @GetMapping(value = "/login")
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        //因为在Web程序中记住身份信息往往使用Cookies，而Cookies只能在Response提交时才能被删除，所以强烈要求在为最终用户调用subject.logout()之后立即将用户引导到一个新页面，确保任何与安全相关的Cookies如期删除，这是Http本身Cookies功能的限制而不是Shiro的限制。
        return "login";
    }

    @RequestMapping("/403")
    public String page_403() {
        return "/pages/page_403";
    }

    @RequestMapping("/404")
    public String page_404() {
        return "/pages/page_404";
    }

    @RequestMapping("/500")
    public String page_500() {
        return "/pages/page_500";
    }


}
