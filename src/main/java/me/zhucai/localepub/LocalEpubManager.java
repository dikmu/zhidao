package me.zhucai.zhidao.localepub;

import me.zhucai.zhidao.util.ConstantUtil;
import me.zhucai.zhidao.util.FileNameUtil;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 本地epub文件管理
 * 已下载文件
 * 黑白名单
 */
public class LocalEpubManager {

    /**
     * 获取所有已下载的epub的文件名列表
     */
    public static List getAllEpubInDisk() {
        List<String> newBooks = new FileNameUtil().getFilesInDir(ConstantUtil.NEW_EPUB_DIR);
        List<String> convertedBooks = new FileNameUtil().getFilesInDir("J:\\备份\\epub源文件");
        List totalList = new ArrayList(newBooks.size() + convertedBooks.size()  + 1);
        for (String s : newBooks) {
            totalList.add(s);
        }
        for (String s : convertedBooks) {
            totalList.add(s);
        }
        Collections.sort(totalList);
        return totalList;
    }

    public static void readLocalBookToELK(){

    }

    public static void main(String[] args) {
        System.out.println(getAllEpubInDisk().size());
    }

}
