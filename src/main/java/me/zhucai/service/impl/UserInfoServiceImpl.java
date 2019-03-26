package me.zhucai.service.impl;

import me.zhucai.bean.UserInfo;
import me.zhucai.mapper.UserInfoMapper;
import me.zhucai.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Service("UserInfoService")
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    UserInfoMapper userInfoMapper;
    @Override
    public UserInfo findByUsername(String username) {
        return userInfoMapper.findByUsername(username);
    }

    @Override
    public String insert(UserInfo userInfo) {
        String uid = UUID.randomUUID().toString().replaceAll("-","");
        userInfo.setUid(uid);
        return uid;
    }

}
