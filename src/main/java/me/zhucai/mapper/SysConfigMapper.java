package me.zhucai.mapper;

import me.zhucai.bean.SysConfig;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SysConfigMapper {

    List<SysConfig> findAll();

    String findByKey(@Param("key") String key);

}
