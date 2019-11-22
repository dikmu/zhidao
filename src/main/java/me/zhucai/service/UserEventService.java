package me.zhucai.service;

import me.zhucai.bean.UserEvent;

import java.util.List;

public interface UserEventService {

    List<UserEvent> queryUserDailyEvent(String userId);

}
