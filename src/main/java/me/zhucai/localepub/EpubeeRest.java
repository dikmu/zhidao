package me.zhucai.localepub;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import me.zhucai.util.ConstantUtil;
import me.zhucai.util.FileIteratorUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Set;

@RestController
public class EpubeeRest {

    public static String TOTAL_STR_CACHE = null;
    public static String TOTAL_STR_ERROR_CACHE = null;

//    public static List BookList = LocalEpubManager.getAllEpubInDisk();
//    public static String TestFileStr = null;
//    public static String TestFileStr2 = null;
//    public static String TestFileStr3 = null;

//    @GetMapping(path = "/epubee/receive2", produces = "text/html")
//    public String test() {
//        return "ok";
//    }

    /**
     * 0
     * 从屏幕抓取结果获取电子书名
     *
     * @return
     */
    @PostMapping(path = "/epubee/receive", produces = "application/json")
    public JSONObject receiveScreenShotBooks(HttpServletRequest request, @RequestBody String books) {
        System.out.println("receiveScreenShotBooks:");
        System.out.println(books);

        JSONArray jsonArray = new JSONArray();
        for (String book : books.split(":::")) {
            //整理书名
            String bookName = book.trim();
            if (bookName.indexOf(":") != -1) {
                bookName = bookName.split(":")[0].trim();
            }
            if (bookName.indexOf("：") != -1) {
                bookName = bookName.split("：")[0].trim();
            }
            System.out.println("bookName:"+bookName);
            //在EpubTempFile.txt中查找
            String epubTempFile = readFileInotoString(ConstantUtil.LOCAL_EPUB_EPUB_TEMP_FILE);
            if (epubTempFile.indexOf(bookName) != -1) {
                jsonArray.add(book);
                continue;//不再查找图书
            } else if (bookName.indexOf("\\\\") != -1 && epubTempFile.indexOf(bookName.replaceAll("\\\\", " ")) != -1) {
                jsonArray.add(book);
                continue;
            }
            //在最近下载目录中查找
            String newDownloadDirFileNames = readFileDirSetIntoString(ConstantUtil.NEW_EPUB_DIR);
            if (newDownloadDirFileNames.indexOf(bookName) != -1) {
                jsonArray.add(book);
                continue;
            }
            //Total.txt
            if(TOTAL_STR_CACHE==null){
                TOTAL_STR_CACHE = readFileInotoString(ConstantUtil.LOCAL_EPUB_TOTAL);
            }
            if (TOTAL_STR_CACHE.indexOf(bookName) != -1) {
                jsonArray.add(book);
                //todo 中英文逗号区别,词向量分析
                continue;
            }
            if(TOTAL_STR_ERROR_CACHE==null){
                TOTAL_STR_ERROR_CACHE = readFileInotoString(ConstantUtil.LOCAL_EPUB_TOTAL_ERROR);
            }
            if (TOTAL_STR_ERROR_CACHE.indexOf(bookName) != -1) {
                jsonArray.add(book);
                //todo 中英文逗号区别,词向量分析
                continue;
            }
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("selected", jsonArray);
        System.out.println(jsonObject);
        return jsonObject;
    }


    public static String readFileInotoString(String filePath) {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                line = br.readLine();
            }
            return sb.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String readFileDirSetIntoString(String dirPath) {
        Set LocalBookSet = new FileIteratorUtil().getFilesInDir(dirPath);
        StringBuffer sb = new StringBuffer();
        for (Object s : LocalBookSet) {
            sb.append(s + "::");
        }
        return sb.toString();
    }

//    public static String readFileInotoString2() {
//        try (BufferedReader br = new BufferedReader(new FileReader("D:\\WS\\ws_github\\calibre 书库\\EpubTempFile.txt"))) {
//            StringBuilder sb = new StringBuilder();
//            String line = br.readLine();
//            while (line != null) {
//                sb.append(line);
//                line = br.readLine();
//            }
//            TestFileStr3 = sb.toString();
//            return TestFileStr3;
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return TestFileStr3;
//    }

}