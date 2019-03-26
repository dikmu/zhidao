package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SysPermission  implements Serializable {
    String id;//主键.
    String name;//名称.
    String url;//资源路径.
    String permission; //权限字符串
}
