package me.zhucai.service;

import me.zhucai.bean.UserInfo;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
public interface UserInfoService {
    /**通过username查找用户信息;*/
    UserInfo findByUsername(String username);

    String insert(UserInfo userInfo);
}
