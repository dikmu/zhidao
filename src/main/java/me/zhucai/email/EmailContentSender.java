package me.zhucai.email;

import me.zhucai.bean.UserInfo;
import me.zhucai.config.SystemConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("EmailContentSender")
public class EmailContentSender {

    @Autowired
    private MailService mailService;

    //username:email
    public void sendRegisterActiveEmail(UserInfo userInfo) {
        String username = userInfo.getUsername();
        int code = userInfo.getActiveCode();
        String emailContent = "您正在注册助才网账号 http://www.zhucai.me <br>" +
                "登录账号：" + username + "<br>" +
                "激活码：" + code + "<br>" +
                "请于48小时内激活" + "<br>";
        //for debug
        if (username.indexOf("@test.com") > 0) {
            username = "muhongdi@qq.com";
        }
        System.out.println(username + ",注册验证码:" + code);
        if (SystemConfig.SEND_REG_EMAIL) {
            mailService.send("助才网", "注册验证码" + code, emailContent, username, null);
        }
    }

    //username:email
    public void sendRegisterSuccessEmail(UserInfo userInfo) {
        String username = userInfo.getUsername();
        String password = userInfo.getDescription();
        String emailContent = "您的助才网账号信息 http://www.zhucai.me <br>" +
                "登录账号：" + username + "<br>" +
                "密码：" + password + "<br>" +
                "<small>该明文密码将从本站删除，请牢记您的登录信息</small>" + "<br>";
        //for debug
        if (username.indexOf("@test.com") > 0) {
            username = "muhongdi@qq.com";
        }
        System.out.println(username + ",密码:" + password);
        if (SystemConfig.SEND_REG_SUCCESS_EMAIL) {
            mailService.send("助才网", "助才网账号信息", emailContent, username, null);
        }
    }

    //username:email
    public void sendResetPasswordEmail(UserInfo userInfo) {
        String username = userInfo.getUsername();
        String password = userInfo.getDescription();
        String emailContent = "您的助才网账号信息 http://www.zhucai.me <br>" +
                "登录账号：" + username + "<br>" +
                "密码：" + password + "<br>" +
                "<small>该明文密码将从本站删除，请牢记您的登录信息</small>" + "<br>";
        //for debug
        if (username.indexOf("@test.com") > 0) {
            username = "muhongdi@qq.com";
        }
        System.out.println(username + ",密码:" + password);
        if (SystemConfig.SEND_REG_SUCCESS_EMAIL) {
            mailService.send("助才网", "助才网账号信息", emailContent, username, null);
        }
    }

}
