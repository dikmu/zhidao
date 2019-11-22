package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEvent {

    String userId;
    String opt;
    String optPlace;
    Date optTime;
    String optHow;

}
