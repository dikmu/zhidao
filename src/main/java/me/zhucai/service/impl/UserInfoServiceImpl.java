package me.zhucai.service.impl;

import me.zhucai.entity.UserInfo;
import me.zhucai.mapper.UserInfoMapper;
import me.zhucai.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
