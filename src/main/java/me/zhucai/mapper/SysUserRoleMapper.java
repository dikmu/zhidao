package me.zhucai.mapper;

import me.zhucai.bean.SysUserRole;
import org.apache.ibatis.annotations.*;

@Mapper
public interface SysUserRoleMapper {

    @Select("SELECT user_id userId,role_id roleId,start_time startTime,end_time endTime,status FROM public.sys_user_role WHERE user_id =#{id}")
    SysUserRole selectByUserId(@Param("id") String id);

    @Update("UPDATE public.sys_user_role SET role_id=#{roleId}, start_time=#{startTime},end_time=#{endTime},status=#{status} WHERE user_id =#{userId}")
    void update(SysUserRole sysUserRole);

    @Insert("INSERT INTO public.sys_user_role(uuid, user_id, role_id, start_time, end_time, status) VALUES (#{uuid}, #{userId}, #{roleId}, #{startTime}, #{endTime}, #{status})")
    void insert(SysUserRole sysUserRole);
}
