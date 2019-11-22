package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book implements Comparable<Book> {

    String uuid;
    String title;
    String download;
    String content;
    String filename;
    String path;
    String creator;
    String language;
    String description;
    Integer wordCount;

//    public Book(String uuid,String title,String ){
//
//    }


//    @Override
//    public int compare(Book o1, Book o2) {
//        if (o1.getWordCount() > o2.getWordCount()) {
//            return 1;
//        } else if (o1.getWordCount() < o2.getWordCount()) {
//            return -1;
//        }
//        return 0;
//    }


    @Override
    public int compareTo(Book o) {
        Book o1 = this;
        Book o2 = o;
        if (o1.getWordCount() > o2.getWordCount()) {
            return 1;
        } else if (o1.getWordCount() < o2.getWordCount()) {
            return -1;
        }
        return 0;
    }



}
