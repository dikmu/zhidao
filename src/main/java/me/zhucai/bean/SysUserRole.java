package me.zhucai.bean;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SysUserRole {

    String uuid;
    String userId;
    String roleId;
    Date startTime;
    Date endTime;
    String status;

    @Override
    public String toString() {
        return "SysUserRole{" +
                "uuid='" + uuid + '\'' +
                ", userId='" + userId + '\'' +
                ", roleId='" + roleId + '\'' +
                ", expireTime=" + startTime + '\'' +
                ", endTime=" + endTime + '\'' +
                ", status=" + status + '\'' +
                '}';
    }

}
