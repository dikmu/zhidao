package me.zhucai.controller;

import me.zhucai.bean.UserInfo;
import me.zhucai.service.BusinessData;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * All page direct
 *
 * @author muhongdi
 * @date 2018年9月6日
 */
@Controller
public class PageDirectController {

    public static final String PAGE_ROOT = "pages/";
    public static final String PAGE_ID_BOOK_TITLE_SEARCH = "BookTitleSearch";
    public static final String PAGE_ID_BOOK_ES_SEARCH = "BookEsSearch";
    public static final String PAGE_ID_BOOK_DB_SEARCH = "BookDbSearch";
    public static final String PAGE_ID_CLASS_SEARCH = "ClassSearch";
    public static final String PAGE_ID_DISK_FILE_SEARCH = "DiskFileSearch";
    public static final String PAGE_ID_BUY_KNOWLEDGE_SEARCH = "BuyKnowledgeSearch";
    public static final String PAGE_ID_BUY_THINGS_SEARCH = "BuyThingsSearch";
    public static String[] AUTO_DIRECT_PAGES;

//    static {
//        AUTO_DIRECT_PAGES = new String[]{PAGE_ROOT + PAGE_ID_BOOK_ES_SEARCH, PAGE_ROOT + PAGE_ID_BUY_THINGS_SEARCH};
//    }

    /**
     * default page
     *
     * @param model
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/")
    public String welcome(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return index(model, request, response);
    }

    /**
     * login
     *
     * @param model
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    @GetMapping(value = "/login")
    public String login(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCommonMenuNavData(model);
//        String url = WebUtils.getSavedRequest(request).getRequestUrl();
        return "/login";
    }

    @GetMapping(value = "/pages/index")
    public String index(Model model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        setCommonMenuNavData(model);
//        if (WebUtils.getSavedRequest(request) != null) {
//            String url = WebUtils.getSavedRequest(request).getRequestUrl();
//            System.out.println("WebUtils.getSavedRequest(request).getRequestUrl()");
//            System.out.println(url);
//            if (StringUtils.isNotBlank(url) && !"/pages/index".equals(url)) {
//                response.sendRedirect("/" + url);
//            }
//        }
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

    @GetMapping(value = "/pages/UserProfile")
    public String userProfile(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", "UserProfile");
        Date expireDate = new SysUserRoleController().findSysUserRoleByUserId("").getDate("expireDate");
        model.addAttribute("expireDate", expireDate);
        return "/pages/UserProfile";
    }

    @GetMapping(value = "/pages/ChangePassword")
    public String userChangePassword(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", "ChangePassword");
        return "/pages/ChangePassword";
    }

    @GetMapping(value = "/pages/BuyBookVip")
    public String pay(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", "BuyBookVip");
        return "/pages/BuyBookVip";
    }

    @GetMapping(value = "/pages/VipAdmin")
    public String vipAdmin(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", "VipAdmin");
        return "/pages/VipAdmin";
    }

    @GetMapping(value = "/pages/RegisterSuccess")
    public String registerSuccess(Model model) {
        setCommonMenuNavData(model);
        model.addAttribute("PageId", "RegisterSuccess");
        return "/pages/RegisterSuccess";
    }

    @GetMapping(value = "/pages/ActiveAccount")
    public String activeAccount(Model model) {
        model.addAttribute("PageId", "ActiveAccount");
        return "/pages/ActiveAccount";
    }

    @GetMapping(value = "/pages/ActiveSuccess")
    public String activeSuccess(Model model) {
        model.addAttribute("PageId", "ActiveSuccess");
        return "/pages/ActiveSuccess";
    }

    @GetMapping(value = "/pages/ResetPassword")
    public String resetPassword(Model model) {
        model.addAttribute("PageId", "ResetPassword");
        return "/pages/ResetPassword";
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
        if (subject == null || subject.getPrincipal() == null) {
            model.addAttribute("logined", "N");
            model.addAttribute("menus", BusinessData.getSysMenus());
            return;
        }
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        model.addAttribute("logined", "Y");
        model.addAttribute("username", userInfo.getUsername());
        model.addAttribute("menus", BusinessData.getSysMenus());
        if (subject.hasRole("admin")) {
            model.addAttribute("role", "admin");
            model.addAttribute("roleName", "管理员");
        } else if (subject.hasRole("vip")) {
            model.addAttribute("role", "vip");
            model.addAttribute("roleName", "VIP");
        } else if (subject.hasRole("guest")) {
            model.addAttribute("role", "guest");
            model.addAttribute("roleName", "访客");
        }
    }

//    @GetMapping(value = "/login")
//    public String loginPage() {
//        return "login";
//    }

    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
        SecurityUtils.getSubject().logout();
        //因为在Web程序中记住身份信息往往使用Cookies，而Cookies只能在Response提交时才能被删除，所以强烈要求在为最终用户调用subject.logout()之后立即将用户引导到一个新页面，确保任何与安全相关的Cookies如期删除，这是Http本身Cookies功能的限制而不是Shiro的限制。
//        response.sendRedirect("/pages/index");
        return "/login";
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
