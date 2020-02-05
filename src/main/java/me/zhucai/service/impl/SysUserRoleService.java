package me.zhucai.service.impl;

import me.zhucai.bean.SysUserRole;
import me.zhucai.mapper.SysUserRoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("SysUserRoleService")
public class SysUserRoleService {

    @Autowired
    SysUserRoleMapper sysUserRoleMapper;

    public void insert(SysUserRole sysUserRole) {
        sysUserRoleMapper.insert(sysUserRole);
    }

//    public void activeUser(String userId){
//        SysUserRole sysUserRole=new SysUserRole();
//        sysUserRole.setUserId(userId);
//        sysUserRole.setRoleId("guest");
//        sysUserRoleMapper.insert();
//    }

}
