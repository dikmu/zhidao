package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@RestController
public class LoginController {

    private static final Logger logger = LogManager.getLogger(LoginController.class);

    // 这里如果不写method参数的话，默认支持所有请求，如果想缩小请求范围，还是要添加method来支持get, post等等某个请求。
    @PostMapping(value = "/login")
    public JSONObject login(HttpServletRequest request, @RequestBody JSONObject loginJson) {
        logger.info("try login");
        String account = loginJson.getString("username");
        String password = loginJson.getString("password");
        Boolean remember = loginJson.getBoolean("remember");
        UsernamePasswordToken upt = new UsernamePasswordToken(account, password, remember);
        Subject subject = SecurityUtils.getSubject();
        JSONObject result = new JSONObject();
        try {
            subject.login(upt);
            result.put("code", "ok");
            result.put("msg", "登录成功");
            logger.info("login success");
            return result;
        } catch (org.apache.shiro.authc.UnknownAccountException e) {
            result.put("code", "error");
            result.put("msg", "账户不存在");
        } catch (org.apache.shiro.authc.IncorrectCredentialsException e) {
            result.put("code", "error");
            result.put("msg", "密码不正确");
        } catch (org.apache.shiro.authc.LockedAccountException e) {
            result.put("code", "error");
            result.put("msg", "账户已被锁定");
        } catch (org.apache.shiro.authc.ExcessiveAttemptsException e) {
            result.put("code", "error");
            result.put("msg", "密码不正确");
        } catch (org.apache.shiro.authc.AuthenticationException e) {
            result.put("code", "error");
            result.put("msg", "认证异常");
        } catch (Exception e) {
            result.put("code", "error");
            result.put("msg", e.getMessage());
        }
        logger.error("login error ip :" + request.getRemoteAddr());
        logger.error("login error:" + result);
        return result;
    }


}
