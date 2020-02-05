package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.UserInfo;
import me.zhucai.email.EmailContentSender;
import me.zhucai.email.TencentEnterpriseMailService;
import me.zhucai.mapper.UserInfoMapper2;
import me.zhucai.service.impl.UserInfoService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserInfoController {

    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    EmailContentSender emailContentSender;

    @Autowired
    private TencentEnterpriseMailService tencentEnterpriseMailService;

    @Autowired
    public UserInfoMapper2 userInfoMapper2;


    @PostMapping("/exists/{username}")
    public ResponseEntity checkUserExists(@PathVariable("username") String username) {
        int count = userInfoService.checkUserExists(username);
        if (count > 0) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body(true);
        } else {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body(false);
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity checkUserExists(@RequestBody JSONObject jsonObject) {
        String username = jsonObject.getString("username");
        UserInfo userInfo = userInfoService.findByUsername(username);
        if (userInfo == null) {
            return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("error:该用户不存在，请核对您的邮箱");
        }
        //todo
//        userInfo.setPassword();
//        userInfo.setSalt();
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body(false);
    }




    public static void main(String[] args) {
        RandomNumberGenerator rng = new SecureRandomNumberGenerator();
        Object salt1 = "9tev8RvOpafCy3ny7Q2vgQ==";//rng.nextBytes();
//        String salt1 = "1234567";
        ByteSource salt2 = ByteSource.Util.bytes(salt1);
        System.out.println(salt2);
        String pass = "123456";
        String hashedPasswordBase64 = new Md5Hash(pass, salt2, 2).toBase64();
        //String hashedPasswordBase64 = new Sha256Hash(pass, salt2, 1024).toBase64();
        System.out.println("store pass:" + hashedPasswordBase64 + ",store salt:" + salt1);
//        MTIzNDU2Nw==
//                pass:qPCbHZiSYuCCK8PsiOxJJQ==,salt1:1234567
    }

}
