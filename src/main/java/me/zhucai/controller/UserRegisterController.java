package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.UserInfo;
import me.zhucai.email.EmailContentSender;
import me.zhucai.email.EmailUtil;
import me.zhucai.service.impl.SysUserRoleService;
import me.zhucai.service.impl.UserInfoService;
import me.zhucai.service.impl.UserRegisterService;
import me.zhucai.util.LookupUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class UserRegisterController {

    @Autowired
    UserRegisterService userRegisterService;

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    EmailContentSender emailContentSender;

    @Autowired
    SysUserRoleService sysUserRoleService;


    private static final Logger logger = LoggerFactory.getLogger(UserRegisterController.class);

    @PostMapping("/register")
    public synchronized ResponseEntity createUser(@RequestBody JSONObject jsonObject) {
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        //合规验证
        if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:账号、密码不能为空");
        }
        if (StringUtils.isBlank(username) || StringUtils.isBlank(password) || username.indexOf(" ") > -1 || password.indexOf(" ") > -1) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:账号、密码不能包含空格");
        }
        if (!EmailUtil.isValidEmail(username)) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:" + username + "不是有效的Email地址");
        }
        //验证重复注册
        int count = userInfoService.checkUserExists(username);
        if (count > 0) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:" + username + "已注册过本站");
        }
        //开始注册
        logger.info("register new user");
        UserInfo userInfo = userRegisterService.createNewUser(username, password);
        new Thread(new Runnable() {
            @Override
            public void run() {
                logger.info("send register active email to " + username);
                emailContentSender.sendRegisterActiveEmail(userInfo);
            }
        }).start();
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("redirect:/pages/ActiveAccount");
    }

    @PostMapping("/active")
    public synchronized ResponseEntity activeUser(@RequestBody JSONObject jsonObject) {
        String username = jsonObject.getString("username");
        int activeCode = jsonObject.getInteger("activeCode");
        UserInfo userInfo = userRegisterService.activeNewUser(username, activeCode);
        if (!userInfo.getState().equals(LookupUtil.USER_STATUS_ACTIVED)) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:激活码错误");
        }
        //激活成功
        logger.info("active success user : " + username);
        new Thread(new Runnable() {
            @Override
            public void run() {
                logger.info("send register success email to " + username);
                emailContentSender.sendRegisterSuccessEmail(userInfo);
            }
        }).start();
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("redirect:/pages/ActiveSuccess");
    }


}
