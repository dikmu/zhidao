package me.zhucai.localmp3;

import me.zhucai.util.FileIteratorUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Set;
import java.util.UUID;

public class DirToInsertDBSQL {

    public void run1() {
        String doc_id = "8";
        Set LocalBookSet = new FileIteratorUtil().getFilesInDir("E:\\01.嘻玛课\\01 嘻玛课程(序号：X)\\02-【持续上新】1\\20 熊浩哈佛谈判术：生活无处不谈判（更新中）");
        for (Object s : LocalBookSet) {
            String ss = s.toString();
            if (ss.toLowerCase().lastIndexOf(".mp3") != -1 || ss.toLowerCase().lastIndexOf(".mp4") != -1) {
                //file name
                String filename = ss.substring(ss.lastIndexOf("\\") + 1, ss.length());
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                System.out.println("insert into study_record values( '" + doc_id + "','" + uuid + "','" + filename + "','" + 1 + "','' );");
            }
        }
    }

    public static void run2(String dir, File outFile) throws IOException {
        Set LocalBookSet = new FileIteratorUtil().getFilesInDir(dir);
        FileOutputStream fos = new FileOutputStream(outFile);
        for (Object s : LocalBookSet) {
            String ss = s.toString();
            if (ss.toLowerCase().lastIndexOf(".mp3") != -1 || ss.toLowerCase().lastIndexOf(".mp4") != -1) {
                //file name
                ss=ss.replaceAll("'","''");
                String filename = ss.substring(ss.lastIndexOf("\\") + 1, ss.length());
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                System.out.println();
                String out = "insert into all_study_doc values( '" + uuid + "','" + filename + "','" + ss + "' );\n";
                fos.write(out.getBytes());
                System.out.println(ss);
            }
        }
        System.out.println("over "+dir);
        fos.flush();
        fos.close();
    }


    public static void main(String[] args) {
        try {
//            String[] dirs = {"J:\\音频教程"};
            String[] dirs = {"E:\\音频教程"};
            int i = 0;
            for (String dir : dirs) {
                i++;
                run2(dir, new File("d:\\output" + i + ".txt"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
