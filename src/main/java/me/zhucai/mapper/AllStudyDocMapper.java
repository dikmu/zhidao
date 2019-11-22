package me.zhucai.mapper;

import me.zhucai.bean.AllStudyDoc;
import me.zhucai.bean.SysRole;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AllStudyDocMapper {

    List<AllStudyDoc> queryAll();

    int insert(AllStudyDoc allStudyDoc);

    int updateInfoContent(AllStudyDoc allStudyDoc);

}
