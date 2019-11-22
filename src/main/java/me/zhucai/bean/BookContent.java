package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Setter
@Getter
public class BookContent {
    String uuid;
    String bookId;
    Long lineNum;
    String content;
}
