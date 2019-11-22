package me.zhucai.service.impl;

import me.zhucai.bean.UserInfo;
import me.zhucai.controller.BookEsSearchController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import java.util.HashMap;
import java.util.Map;

public class SecurityServiceImpl {


    public static Map<String, Integer> userAccessTimesMap = null;

    private static final Logger logger = LogManager.getLogger(BookEsSearchController.class);

    public static UserInfo getUserInfo(boolean logUserInfo) {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            return null;
        }
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        if (logUserInfo) {
            logger.info("UserId:" + userInfo.getUid() + ",UserName:" + userInfo.getUsername());
        }
        return userInfo;
    }

    public static boolean userOperationTooFast() {
        Subject subject = SecurityUtils.getSubject();
        Object optTimes = subject.getSession().getAttribute("opt_limits");
        if (optTimes == null) {
            subject.getSession().setAttribute("opt_limits", System.currentTimeMillis());
        }
        //忽略3秒内的重复操作
        if (System.currentTimeMillis() - (Long) optTimes < 3000) {
            UserInfo userInfo = (UserInfo) subject.getPrincipal();
            if (userInfo != null) {
                logger.warn("operation too fast by user:" + userInfo.getUid());
            } else {
                logger.warn("operation too fast by user:" + subject.getSession());
            }
            return true;
        }
        return false;
    }

    private static void initUserAccessLimitMap() {
        userAccessTimesMap = new HashMap<>();
    }


}
