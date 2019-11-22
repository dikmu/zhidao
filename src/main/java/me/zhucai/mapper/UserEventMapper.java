package me.zhucai.mapper;


import me.zhucai.bean.UserEvent;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author muhongdi
 * @date 2018年9月6日
 */
@Mapper
public interface UserEventMapper {

    @Insert("insert into user_event(user_id,opt,opt_place,opt_time,opt_how) values(#{userId},#{opt},#{optPlace},#{optTime},#{optHow})")
    int insert(UserEvent userEvent);

    @Select("select user_id userId,opt,opt_place optPlace,opt_time optTime,opt_how optHow from user_event t where t.user_id = #{userId} and t.opt_time >= to_timestamp(#{dateStartStr},'yyyy-mm-dd') and t.opt = #{opt}")
    List<UserEvent> userDailySearchHistory(@Param("userId") String userId, @Param("dateStartStr") String dateStartStr, @Param("opt") String opt);

    @Select("select user_id userId,opt,opt_place optPlace,opt_time optTime,opt_how optHow from user_event t where t.user_id = #{userId} and t.opt = #{opt} order by t.opt_time desc limit 20")
    List<UserEvent> userRecentSearchHistory(@Param("userId") String userId,  @Param("opt") String opt);

    @Select("select opt_how optHow from user_event t where t.user_id != #{userId} and t.opt = #{opt} order by t.opt_time desc limit 100")
    List<UserEvent> userHotSearch(@Param("userId") String userId, @Param("opt") String opt);

}
