package me.zhucai.mapper;

import me.zhucai.bean.Book;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookMapper {

    @Insert("insert into book(uuid,title,download,path,filename,description,creator,content,language,word_count) values " +
            "(#{uuid},#{title},#{download},#{path},#{filename},#{description},#{creator},#{content},#{language},#{wordCount})")
    int insert(Book book);

    @Select("select uuid,title,download,path,filename,description,creator,content,language,word_count from book")
    List<Book> selectAll();

	@Select("select uuid,title from book")
	List<Book> selectAllIdAndTitles();

	@Select("select * from book where uuid = #{id}")
    Book findBookById_HasContent(@Param("id") String id);

    @Select("select uuid,title,download,path,filename,description,creator,language,word_count from book where uuid = #{id}")
    Book findBookById_NoContent(@Param("id") String id);


}
