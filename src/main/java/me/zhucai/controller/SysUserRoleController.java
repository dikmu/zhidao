package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.SysUserRole;
import me.zhucai.bean.UserInfo;
import me.zhucai.mapper.SysUserRoleMapper;
import me.zhucai.mapper.UserInfoMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@RequestMapping("SysUserRole")
@RestController
public class SysUserRoleController {

    @Autowired
    SysUserRoleMapper sysUserRoleMapper;

    @Autowired
    UserInfoMapper userInfoMapper;

    /**
     * get user role info
     * skip userId,if current user is not admin
     *
     * @param userId
     * @return
     */
    @GetMapping("roleInfo/{userId}")
    public JSONObject findSysUserRoleByUserId(@PathVariable String userId) {
        Subject subject = SecurityUtils.getSubject();
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        if (!subject.hasRole("admin")) {
            userId = userInfo.getUid();
        } else if (StringUtils.isBlank(userId)) {//是admin，但没传id
            userId = userInfo.getUid();
        }
        JSONObject jsonObject = new JSONObject();
        SysUserRole sysUserRole = sysUserRoleMapper.selectByUserId(userId);
        jsonObject.put("roleId", sysUserRole.getRoleId());
        //todo
//        jsonObject.put("expireDate", sysUserRole.getExpireTime());
        return jsonObject;
    }

    @PostMapping("findVipInfo")
    public ResponseEntity findVipInfo(@RequestBody JSONObject requestBody) {
        Subject subject = SecurityUtils.getSubject();
        if (!subject.hasRole("admin")) {
            return ResponseEntity.status(403).body("{msg:'Not enough grant'}");
        }
        String username = requestBody.getString("username");
        UserInfo userInfo = userInfoMapper.findByUsername(username);
        if (userInfo == null) {
            return ResponseEntity.status(403).body("{msg:'can't find user by username:'" + username + "}");
        }
        String userId = userInfo.getUid();
        SysUserRole sysUserRole = sysUserRoleMapper.selectByUserId(userId);
        if(sysUserRole==null){
            return ResponseEntity.status(200).body("");
        }
        String res = userInfo.toString() + " <br> " + sysUserRole.toString();
        return ResponseEntity.status(200).body(res);
    }

    @PostMapping("buyVipExpireMonth")
    public ResponseEntity buyVipExpireMonth(@RequestBody JSONObject requestBody) {
        Subject subject = SecurityUtils.getSubject();
        if (!subject.hasRole("admin")) {
            return ResponseEntity.status(403).body("{msg:'Not enough grant'}");
        }
        String username = requestBody.getString("username");
        UserInfo userInfo = userInfoMapper.findByUsername(username);
        if (userInfo == null) {
            return ResponseEntity.status(403).body("{msg:'can't find user by username:'" + username + "}");
        }
        String userId = userInfo.getUid();
        int addMonth = requestBody.getInteger("addMonth");
        SysUserRole sysUserRole = sysUserRoleMapper.selectByUserId(userId);
        if (sysUserRole.getRoleId().equals("vip")) {
            //todo
//            Date lastDate = sysUserRole.getExpireTime();
            Date lastDate = null;
            if (lastDate.getTime() - new Date().getTime() < 0) {
                lastDate = new Date();//重置时间，正常不会出现
            }
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(lastDate);
            calendar.add(Calendar.MONTH, addMonth);
        } else {
            sysUserRole.setRoleId("vip");
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, addMonth);
            //todo
//            sysUserRole.setExpireTime(calendar.getTime());
            sysUserRoleMapper.update(sysUserRole);
        }
        sysUserRole = sysUserRoleMapper.selectByUserId(userId);
        return ResponseEntity.status(200).body(sysUserRole);
    }

    public static void main(String[] args) {
        Date lastDate = new Date();
        Calendar calendar = Calendar.getInstance();
        Date date1 = calendar.getTime();
        System.out.println(date1);
        calendar.setTime(lastDate);
        calendar.add(Calendar.MONTH, 12);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        Date date2 = calendar.getTime();
        System.out.println(date2);
        System.out.println(date1.getTime() - new Date().getTime());
    }

}
