package me.zhucai.mapper;

import me.zhucai.entity.UserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Component
public interface UserInfoMapper {
    //通过username查找用户信息
    UserInfo findByUsername(@Param("username") String username);
}
