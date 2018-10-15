package me.zhucai.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.List;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo implements Serializable {
    String uid;//用户id
    String username;//帐号
    String name;
    String password;
    String salt;
    byte state;

    @Override
    public String toString() {
        return "UserInfo{" +
                "uid='" + uid + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", salt='" + salt + '\'' +
                ", state=" + state +
                '}';
    }

    public static void main(String[] args) {
        Field[] fields = UserInfo.class.getDeclaredFields();
        for(Field f:fields){
            System.out.println(f.getName()+" "+f.getType().getName());
        }
    }


}
