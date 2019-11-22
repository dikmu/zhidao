package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EpubeeAllBook {

    public String name;

    public Date addedDate;

    public Boolean downloaded;

//    public EpubeeAllBook(String name,Date date){
//    }

}
