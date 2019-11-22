package me.zhucai.service;


import me.zhucai.bean.EpubeeAllBook;

public interface EpubeeAllBookService {

    int countBook(String name);

    int insert(String name, Boolean downloaded);

    EpubeeAllBook queryByName(String name);

}
