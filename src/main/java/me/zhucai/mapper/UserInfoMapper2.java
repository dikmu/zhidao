package me.zhucai.mapper;

import me.zhucai.bean.UserInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserInfoMapper2 {

    public static final String TABLE_NAME = "USER_INFO";
    public static final String SQL_INSERT = "INSERT INTO USER_INFO(UID,USERNAME,PASSWORD,SALT,STATE) VALUES (#{UID},#{USERNAME},#{PASSWORD},#{SALT},#{STATE})";
    public static final String SQL_GET_ALL = "SELECT UID,USERNAME,PASSWORD,SALT,STATE FROM USER_INFO ORDER BY UID";
    public static final String SQL_FILTER = "SELECT UID,USERNAME,PASSWORD,SALT,STATE FROM WHERE NAME LIKE '%#{NAME}%' USER_INFO ORDER BY UID";
    public static final String SQL_SELECT = "SELECT UID,USERNAME,PASSWORD,SALT,STATE FROM USER_INFO WHERE UID = #{UID} ORDER BY UID";
    public static final String SQL_UPDATE = "<script>update USER_INFO <set><if test='USERNAME!=null'>USERNAME=#{USERNAME},</if><if test='PASSWORD!=null'>PASSWORD=#{PASSWORD},</if><if test='SALT!=null'>SALT=#{SALT},</if><if test='STATE!=null'>STATE=#{STATE}</if></set><where>UID=#{UID}</where></script>";
    public static final String SQL_DELETE = "DELETE FROM USER_INFO WHERE UID = #{UID}";


    @Select(SQL_SELECT)
    UserInfo getUserInfoById(String uid);

    @Select(SQL_SELECT)
    UserInfo selectById(String uid);

    @Select(SQL_FILTER)
    List<UserInfo> selectList(String name);

    @Select(SQL_GET_ALL)
    List<UserInfo> selectAll();

    @Insert(SQL_INSERT)
    int insert(UserInfo userInfo);

    @Update(SQL_UPDATE)
    int update(UserInfo userInfo);

    @Delete(SQL_DELETE)
    int delete(UserInfo userInfo);

}
