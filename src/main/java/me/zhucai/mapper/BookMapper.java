package me.zhucai.mapper;

import me.zhucai.bean.Book;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BookMapper {

    @Insert("insert into book(uuid,title,download,path,filename,description) values (#{uuid},#{title},#{download},#{path},#{filename},#{description})")
    int insert(Book book);

    @Select("select uuid,title,download,path,filename,description from book")
    List<Book> selectAll();

	@Select("select uuid,title from book")
	List<Book> selectAllIdAndTitles();

}
