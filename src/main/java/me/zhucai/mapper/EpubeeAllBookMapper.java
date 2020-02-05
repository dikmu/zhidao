package me.zhucai.mapper;

import me.zhucai.bean.EpubeeAllBook;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EpubeeAllBookMapper {

    @Insert("insert into epubee_all_book(name,added_date,downloaded) values (#{name},#{addedDate},#{downloaded})")
    int insert(EpubeeAllBook book);

    @Select("select count(1) from epubee_all_book where name = #{name}")
    int countBook(String name);

    @Update("update epubee_all_book set downloaded = true where name = #{name}")
    void setAsDownloaded(String name);

    @Select("select name from epubee_all_book where name = #{name}")
    List<EpubeeAllBook> queryByName(String name);

    /**
     * 改变日期，获取下一批待下载书籍
     * 2019-07-20及之前，已完成下载
     * >= '2019-12-01' and added_date <= '2019-12-28' 已完成下载
     * >= '2019-11-01' and added_date <= '2019-11-30' 已完成下载
     * >= '2019-07-21' and added_date <= '2019-08-30' 已完成下载
     *
     * @return
     */
    @Select("select * from epubee_all_book where downloaded = false and added_date >= '2019-08-31' and added_date <= '2019-10-31' order by name")
    List<EpubeeAllBook> queryUndownloadedBooks();

}
