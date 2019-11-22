package me.zhucai.service.impl;

import me.zhucai.bean.UserEvent;
import me.zhucai.mapper.UserEventMapper;
import me.zhucai.service.UserEventService;
import me.zhucai.util.Lookup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("UserEventService")
public class UserEventServiceImpl implements UserEventService {

    @Autowired
    public UserEventMapper userEventMapper;

    public List<UserEvent> queryUserDailyEvent(String userId) {
        String curDateStartStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<UserEvent> userEvents = userEventMapper.userDailySearchHistory(userId, curDateStartStr, Lookup.USER_EVENT_OPT_ES_SEARCH);
        return userEvents;
    }

//    public Set<String> queryUserDailySearch(){
//
//    }

}
