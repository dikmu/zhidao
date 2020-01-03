package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.UserInfo;
import me.zhucai.mapper.UserInfoMapper2;
import me.zhucai.service.UserInfoService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserRest {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    public UserInfoMapper2 userInfoMapper2;

    @PostMapping()
    public String createUser(@RequestBody JSONObject jsonObject) {
        System.out.println(jsonObject);
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(jsonObject.getString("username"));
        userInfo.setPassword(jsonObject.getString("password"));
        userInfo.setSalt(jsonObject.getString("salt"));
        userInfo.setState(jsonObject.getString("state"));
        System.out.println(userInfo);
        String id = userInfoService.insert(userInfo);
        System.out.println(id);
        return id;
    }

    @GetMapping("/preventTimeout")
    public ResponseEntity preventTimeout() {
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("ok");
    }

    @PostMapping()
    @RequestMapping("/test")
    public String createUserTest(@RequestBody JSONObject jsonObject) {
        System.out.println(jsonObject);
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(jsonObject.getString("username"));
        userInfo.setPassword(jsonObject.getString("password"));
        userInfo.setSalt(jsonObject.getString("salt"));
        userInfo.setState(jsonObject.getString("state"));
        userInfo.setUid(UUID.randomUUID().toString().replaceAll("-", ""));
        int i = userInfoMapper2.insert(userInfo);
        System.out.println(i);
        return "ok" + i;
    }

    @PostMapping()
    @RequestMapping("/test1")
    public String test1(@RequestBody JSONObject jsonObject) {
        return "" + userInfoMapper2.selectAll().size();
    }

    @PostMapping()
    @RequestMapping("/test2")
    public String test2(@RequestBody JSONObject jsonObject) {
        return "" + userInfoMapper2.selectById(jsonObject.getString("UID")).toString();
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
