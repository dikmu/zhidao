package me.zhucai.rest;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.entity.UserInfo;
import me.zhucai.service.UserInfoService;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserRest {

    @Autowired
    UserInfoService userInfoService;

    @PostMapping()
    public String createUser(@RequestBody JSONObject jsonObject) {
        System.out.println(jsonObject);
        UserInfo userInfo =new UserInfo();
        userInfo.setName(jsonObject.getString("name"));
        System.out.println(userInfo);
        String id = userInfoService.inserUser(userInfo);
        System.out.println(id);
        return id;
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
