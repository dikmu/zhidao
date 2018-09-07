package me.zhucai.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    Integer uid;//用户id
    String username;//帐号
    String name;
    String password;
    String salt;
    byte state;
    /**
     * 密码盐.
     * @return
     */
    public String getCredentialsSalt(){

        return this.username+this.salt;
    }
}
