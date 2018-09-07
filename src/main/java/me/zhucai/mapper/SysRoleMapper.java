package me.zhucai.mapper;

import me.zhucai.entity.SysRole;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Component
public interface SysRoleMapper {
    //通过username查找用户角色信息
    List<SysRole> findRoleByUsername(@Param("username") String username);
}
