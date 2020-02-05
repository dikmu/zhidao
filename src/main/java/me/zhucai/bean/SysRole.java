package me.zhucai.bean;

import lombok.*;

import java.io.Serializable;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SysRole  implements Serializable {
    String id;
    String role;//角色标识程序中判断使用,如"admin",这个是唯一的:
    String description; // 角色描述,UI界面显示使用
    private Boolean available = Boolean.FALSE; // 是否可用,如果不可用将不会添加给用户
}
