package me.zhucai.mapper;

import me.zhucai.bean.Template;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TemplateMapper {

    public static final String TABLE_NAME = "TEMPLATE";
    public static final String SQL_INSERT = "INSERT INTO TEMPLATE(UID,NAME) VALUES (#{uid},#{name})";//可用
    public static final String SQL_GET_ALL = "SELECT UID,USERNAME,NAME,PASSWORD,SALT,STATE FROM TEMPLATE ORDER BY UID";
    public static final String SQL_FILTER = "SELECT UID,USERNAME,NAME,PASSWORD,SALT,STATE FROM TEMPLATE WHERE NAME LIKE '%#{NAME}%' ORDER BY UID";
    public static final String SQL_SELECT = "SELECT UID,USERNAME,NAME,PASSWORD,SALT,STATE FROM TEMPLATE WHERE UID = #{UID} ORDER BY UID";
    public static final String SQL_UPDATE = "<script>UPDATE TEMPLATE <set><if test='USERNAME!=null'>USERNAME=#{USERNAME},</if><if test='NAME!=null'>NAME=#{NAME},</if><if test='PASSWORD!=null'>PASSWORD=#{PASSWORD},</if><if test='SALT!=null'>SALT=#{SALT},</if><if test='STATE!=null'>STATE=#{STATE}</if></set><where>UID=#{UID}</where></script>";
    public static final String SQL_DELETE = "DELETE FROM TEMPLATE WHERE UID = #{UID}";

    @Select(SQL_SELECT)
    Template getUserInfoById(String uid);

    @Select(SQL_SELECT)
    Template selectById(String uid);

    @Select(SQL_FILTER)
    List<Template> selectList(String name);

    @Select(SQL_GET_ALL)
    List<Template> selectAll();

    @Insert(SQL_INSERT)
    int insert(Template template);

    @Update(SQL_UPDATE)
    int update(Template template);

    @Delete(SQL_DELETE)
    int delete(Template template);

}
