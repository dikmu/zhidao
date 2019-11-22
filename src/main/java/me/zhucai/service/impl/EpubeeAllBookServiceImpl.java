package me.zhucai.service.impl;

import me.zhucai.bean.EpubeeAllBook;
import me.zhucai.mapper.EpubeeAllBookMapper;
import me.zhucai.service.EpubeeAllBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service("EpubeeAllBookService")
public class EpubeeAllBookServiceImpl implements EpubeeAllBookService {

    @Autowired
    public EpubeeAllBookMapper epubeeAllBookMapper;

    @Override
    public int countBook(String name) {
        return epubeeAllBookMapper.countBook(name);
    }

    @Override
    public int insert(String name, Boolean downloaded) {
        EpubeeAllBook epubeeAllBook = new EpubeeAllBook(name, Calendar.getInstance().getTime(), downloaded);
        return epubeeAllBookMapper.insert(epubeeAllBook);
    }

    @Override
    public EpubeeAllBook queryByName(String name) {
        return null;
    }

}
