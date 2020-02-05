package me.zhucai.service.impl;

import me.zhucai.bean.UserInfo;
import me.zhucai.util.LookupUtil;
import me.zhucai.util.MyRandomUtil;
import me.zhucai.util.ShiroUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service("UserRegisterService")
public class UserRegisterService {

    @Autowired
    UserInfoService userInfoService;

    public UserInfo createNewUser(String username, String password) {
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(username);
        String[] passSalts = ShiroUtil.genSaltedMd5Password(password);
        userInfo.setPassword(passSalts[0]);
        userInfo.setSalt(passSalts[1]);
        userInfo.setState(LookupUtil.USER_STATUS_NEW);
        //todo 临时测试，应该去掉记录password
        userInfo.setDescription(password);
        userInfo.setCreateTime(new Date());
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        userInfo.setUid(uuid);
        int code = MyRandomUtil.genRandomInt(4);
        userInfo.setActiveCode(code);
        userInfoService.insert(userInfo);
        return userInfo;
    }

    public UserInfo activeNewUser(String username, int code) {
        UserInfo userInfo = userInfoService.findByUsername(username);
        if (code == userInfo.getActiveCode()) {
            userInfo.setState(LookupUtil.USER_STATUS_ACTIVED);
            userInfoService.updateUserInfo(userInfo);
        }
        return userInfo;
    }

}
