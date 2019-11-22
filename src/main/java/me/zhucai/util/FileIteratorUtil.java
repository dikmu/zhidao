package me.zhucai.util;

import java.io.File;
import java.util.HashSet;
import java.util.Set;

//todo remove
public class FileIteratorUtil {

    File or;
    File[] files;

    Set LocalBookSet = new HashSet();

    public Set getFilesInDir(String baseDir) {
        iteratorPath(baseDir + "\\");
        return LocalBookSet;
    }

    // 用于遍历文件价
    public void iteratorPath(String dir) {
        or = new File(dir);
        files = or.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    LocalBookSet.add(file.getPath());
//                    System.out.println(file.getName());
                } else if (file.isDirectory()) {
                    iteratorPath(file.getAbsolutePath());
                }
            }
        }
    }

    public static void main(String[] args) {
        Set LocalBookSet = new FileIteratorUtil().getFilesInDir(ConstantUtil.LOCAL_EPUB_LIB_DIR);
        for (Object s : LocalBookSet) {
            System.out.println(s);
        }
    }

}
