package me.zhucai.mapper;

import me.zhucai.bean.Book;
import me.zhucai.bean.BookName;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookNameMapper {

    @Insert("insert into book_name(title) values (#{title})")
    int insert(Book book);

    @Select("select title from book_name where title = #{title}")
    Book selectByName(Book book);

    @Select("select count(1) from book_name where title = #{title}")
    int countByName(String title);

    List<BookName> queryByTitle(@Param("title") String title);

    @Select("select title from book_name order by title")
    List<Book> selectAllBook();

//    @Update("update book_name set(title)")
//    void update(Book book);


    @Select("SELECT 'OK'")
    String ping();

}
