package me.zhucai.controller;

import me.zhucai.email.TencentEnterpriseMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("test")
@RestController
public class TestController {

    @Autowired
    private TencentEnterpriseMailService tencentEnterpriseMailService;

    @GetMapping("email")
    public String sendEmail() {
        tencentEnterpriseMailService.send("skybook", "注册验证码", "1234", "muhongdi@qq.com", null);
        return "ok";
    }


}
