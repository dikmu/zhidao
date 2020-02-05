package me.zhucai.bean;

import lombok.*;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Date;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInfo implements Serializable  {

    String uid;//用户id
    String username;//帐号
    String password;
    String salt;
    String state;
    String description;
    Integer activeCode;
    Date createTime;

    @Override
    public String toString() {
        return "UserInfo{" +
                "uid='" + uid + '\'' +
                ", username='" + username + '\'' +
//                ", password='" + password + '\'' +
//                ", salt='" + salt + '\'' +
                ", state=" + state + '\'' +
//                ", description=" + description + '\'' +
                '}';
    }

    public static void main(String[] args) {
        Field[] fields = UserInfo.class.getDeclaredFields();
        for(Field f:fields){
            System.out.println(f.getName()+" "+f.getType().getName());
        }
    }


}
