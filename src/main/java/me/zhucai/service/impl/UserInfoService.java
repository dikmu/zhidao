package me.zhucai.service.impl;

import me.zhucai.bean.UserInfo;
import me.zhucai.mapper.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Service("UserInfoService")
public class UserInfoService {

    @Autowired
    UserInfoMapper userInfoMapper;

    public UserInfo findByUsername(String username) {
        return userInfoMapper.findByUsername(username);
    }

    public int insert(UserInfo userInfo) {
        return userInfoMapper.insert(userInfo);
    }

    public int checkUserExists(String username) {
        return userInfoMapper.checkUserExists(username);
    }

    public void updateUserInfo(UserInfo userInfo) {
        userInfoMapper.update(userInfo);
    }


}
