package me.zhucai.mapper;

import me.zhucai.bean.Book;
import me.zhucai.bean.BookContent;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookContentMapper {

    @Insert("insert into book_content(uuid,book_id,line_num,content) values (#{uuid},#{bookId},#{lineNum},#{content})")
    int insert(BookContent bookContent);

    @Select("select uuid,book_id,line_num,content from book where book_id = #{uuid} and content like '%#{content}%'")
    List<BookContent> queryByContent(BookContent bookContent);


}
