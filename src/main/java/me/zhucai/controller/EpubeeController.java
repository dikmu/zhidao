package me.zhucai.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.Book;
import me.zhucai.bean.BookName;
import me.zhucai.bean.EpubeeAllBook;
import me.zhucai.mapper.BookNameMapper;
import me.zhucai.mapper.EpubeeAllBookMapper;
import me.zhucai.service.EpubeeAllBookService;
import me.zhucai.util.ConstantUtil;
import me.zhucai.util.FileIteratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/epubee")
public class EpubeeController {

    public static String TOTAL_STR_CACHE = null;
    public static String TOTAL_STR_ERROR_CACHE = null;

    @Autowired
    public BookNameMapper bookNameMapper;

    @Autowired
    public EpubeeAllBookService epubeeAllBookService;

    @Autowired
    public EpubeeAllBookMapper epubeeAllBookMapper;

//    public static List BookList = LocalEpubManager.getAllEpubInDisk();
//    public static String TestFileStr = null;
//    public static String TestFileStr2 = null;
//    public static String TestFileStr3 = null;

//    @GetMapping(path = "/epubee/receive2", produces = "text/html")
//    public String test() {
//        return "ok";
//    }

    @GetMapping("/searchTitle/{title}")
    public JSONArray searchTitle(@PathVariable("title") String title) {
        if (StringUtils.isEmpty(title)) {
            return null;
        }
        title = title.trim();
        System.out.println(title);
        List<BookName> books = bookNameMapper.queryByTitle(title);
        List<String> list = new ArrayList<String>();
        JSONArray array = new JSONArray();
        for (BookName book : books) {
            array.add(book.getTitle());
        }
        System.out.println(array);
        return array;
    }

//    @GetMapping(path = "/getScreenShot")
//    public void getScreenShot(){
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
//        map.add("email", "first.last@example.com");
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
//
//        RestTemplate restTemplate=new RestTemplate();
//        String url="http://cn.epubee.com/keys/get_ebook_list.asmx/getList";
//        ResponseEntity<String> response = restTemplate.postForEntity( url, request , String.class );
//
//    }

    /**
     * 0
     * 从屏幕抓取结果获取电子书名
     *
     * @return
     */
    @PostMapping(path = "/receive", produces = "application/json")
    public JSONObject receiveScreenShotBooks(HttpServletRequest request, @RequestBody String books) {
        System.out.println("receiveScreenShotBooks:");
        System.out.println(books);

        JSONArray jsonArray = new JSONArray();
        for (String book : books.split(":::")) {
            //整理书名
            String bookName = book.trim();
//            if (bookName.indexOf(":") != -1) {
//                bookName = bookName.split(":")[0].trim();
//            }
//            if (bookName.indexOf("：") != -1) {
//                bookName = bookName.split("：")[0].trim();
//            }
//            System.out.println("bookName:" + bookName);
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
            Book book1 = new Book();
            book1.setTitle(bookName);
            if (bookNameMapper.selectByName(book1) != null) {
                jsonArray.add(book);
            }
//            if (TOTAL_STR_CACHE == null) {
//                TOTAL_STR_CACHE = readFileInotoString(ConstantUtil.LOCAL_EPUB_TOTAL);
//            }
//            if (TOTAL_STR_CACHE.indexOf(bookName) != -1) {
//                jsonArray.add(book);
//                //todo 中英文逗号区别,词向量分析
//                continue;
//            }
//            if (TOTAL_STR_ERROR_CACHE == null) {
//                TOTAL_STR_ERROR_CACHE = readFileInotoString(ConstantUtil.LOCAL_EPUB_TOTAL_ERROR);
//            }
//            if (TOTAL_STR_ERROR_CACHE.indexOf(bookName) != -1) {
//                jsonArray.add(book);
//                //todo 中英文逗号区别,词向量分析
//                continue;
//            }
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("selected", jsonArray);
        System.out.println(jsonObject);
        return jsonObject;
    }


    @PostMapping(path = "/screenShot", produces = "application/json")
    public String screenShot(HttpServletRequest request, @RequestBody JSONArray books) {
        System.out.println("screenShot");
        System.out.println(books);
        int added = 0;
        for (int i = 0; i < books.size(); i++) {
            String name = books.getString(i);
            if (epubeeAllBookService.countBook(name) == 0) {
//                if (bookNameMapper.selectByName2(name) == 0) {
                try {
                    epubeeAllBookService.insert(name, false);
                    added++;
                } catch (Exception e) {
                }
//                } else {
//                    try {
//                        epubeeAllBookService.insert(name, true);
//                    } catch (Exception e) {
//                    }
//                }
            }
        }
        return "" + added;
    }

    /**
     * 生成待下载电子书列表（json格式）
     * 重要入口
     *
     * @return
     */
    @GetMapping(path = "/UndownloadedBooks", produces = "text/html")
    public String undownloadedBooks() {
        List<EpubeeAllBook> list = epubeeAllBookMapper.queryUndownloadedBooks();
        List<EpubeeAllBook> list2 = new ArrayList<>();
        //去掉已有
        for (EpubeeAllBook epubeeAllBook : list) {
            int bookExists = bookNameMapper.countByName(epubeeAllBook.getName());
            if (bookExists > 0) {
                System.out.println("book exists:" + epubeeAllBook.getName());
            } else {
                list2.add(epubeeAllBook);
            }
        }
        //输出
        StringBuffer stringBuffer = new StringBuffer();
        for (EpubeeAllBook epubeeAllBook : list2) {
            String n = epubeeAllBook.getName();
            n = n.replaceAll("\"", "\\\\\"");//让"输出为\"(在html上)
            stringBuffer.append("\"" + n + "\",<br>");
        }
        return stringBuffer.toString();
    }

    @GetMapping(path = "/refreshEpubAllBookDownloaded", produces = "text/html")
    public String refreshEpubAllBookDownloaded() {
        List<Book> books = bookNameMapper.selectAllBook();
        System.out.println("-----------------------已下载电子书-------------------");
        int i = 0;
        for (Book book : books) {
            List<EpubeeAllBook> epubeeAllBooks = epubeeAllBookMapper.queryByName(book.getTitle());
            if (epubeeAllBooks.size() > 0) {
                epubeeAllBookMapper.setAsDownloaded(epubeeAllBooks.get(0).getName());
                System.out.println(epubeeAllBooks.get(0).getName());
                i++;
                if (i % 100 == 0) {
                    System.out.println("已完成" + i + "本");
                }
            }
        }
        System.out.println("-----------------------已下载电子书 完毕 " + i + "-------------------");
        return "已下载电子书 完毕" + i;
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

    public static void runGetUndownloadedFiles(int pages) throws Exception {
        String url = "http://cn.epubee.com/files.aspx?&Page=";
        File outFile = new File("d:/outFile.txt");
        FileOutputStream fos = new FileOutputStream(outFile);
        for (int i = 0; i <= pages; i++) {
            String res = getHTML(url + i);
            fos.write(res.getBytes());
            fos.write(System.lineSeparator().getBytes());
        }
        fos.flush();
        fos.close();
    }

    public static String getHTML(String urlToRead) throws Exception {
        StringBuilder result = new StringBuilder();
        URL url = new URL(urlToRead);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        rd.close();
        return result.toString();
    }

    public static void main(String[] args) throws Exception {
//        runGetUndownloadedFiles(10);
    }

}