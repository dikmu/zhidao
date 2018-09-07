package me.zhucai.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Controller
public class HomeController {
    @RequestMapping({"/", "/index"})
    public String index() {
        return "/index";
    }

    // 这里如果不写method参数的话，默认支持所有请求，如果想缩小请求范围，还是要添加method来支持get, post等等某个请求。
    @RequestMapping(value = "/login")
    public String login(HttpServletRequest request, Map<String, Object> map) throws Exception {
        System.out.println("HomeController.login");
        // 登录失败从request中获取shiro处理的异常信息。
        // shiroLoginFailure:就是shiro异常类的全类名.
        Object exception = request.getAttribute("shiroLoginFailure");
        String msg = "";
        if (exception != null) {
            System.out.println(exception);
            if ("org.apache.shiro.authc.UnknownAccountException".equals(exception)) {
                msg = "账户不存在";
            } else if ("org.apache.shiro.authc.IncorrectCredentialsException".equals(exception)) {
                msg = "密码不正确";
            } else if ("org.apache.shiro.authc.LockedAccountException".equals(exception)) {
                msg = "账户已被锁定";
            } else if ("org.apache.shiro.authc.ExcessiveAttemptsException".equals(exception)) {
                msg = "尝试认证次数过多";
            } else if ("org.apache.shiro.authc.AuthenticationException".equals(exception)) {
                msg = "认证异常";
            } else {
                msg = "未知异常";
            }
        }
        map.put("msg", msg);
        // 此方法不处理登录成功,由shiro进行处理.
        return "login";
    }

    @RequestMapping(value = "/logout")
    public String logout() {
        SecurityUtils.getSubject().logout();
        //因为在Web程序中记住身份信息往往使用Cookies，而Cookies只能在Response提交时才能被删除，所以强烈要求在为最终用户调用subject.logout()之后立即将用户引导到一个新页面，确保任何与安全相关的Cookies如期删除，这是Http本身Cookies功能的限制而不是Shiro的限制。
        return "login";
    }

    @RequestMapping("/403")
    public String unauthorizedRole() {
        System.out.println("------没有权限-------");
        return "403";
    }
}
