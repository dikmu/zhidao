package me.zhucai.service.impl;

import me.zhucai.bean.UserEvent;
import me.zhucai.config.UserEventOpt;
import me.zhucai.mapper.UserEventMapper;
import me.zhucai.service.UserEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("UserEventService")
public class UserEventServiceImpl implements UserEventService {

    @Autowired
    public UserEventMapper userEventMapper;

    /**
     * Calc total count , a user operate ES Search at current day
     *
     * @param userId
     * @return
     */
    public List<UserEvent> userDailyEsSearchEvent(String userId) {
        String curDateStartStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<UserEvent> userEvents = userEventMapper.userDailySearchHistory(userId, curDateStartStr, UserEventOpt.ES_SEARCH);
        return userEvents;
    }

    /**
     * Calc total count , a user downloaded at current day
     *
     * @param userId
     * @return
     */
    public List<UserEvent> userDailyEpubDownloadEvent(String userId, String bookId) {
        String curDateStartStr = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<UserEvent> userEvents = userEventMapper.countUserDailyOpt(userId, curDateStartStr, UserEventOpt.DOWN_EPUB, bookId);
        return userEvents;
    }


}
