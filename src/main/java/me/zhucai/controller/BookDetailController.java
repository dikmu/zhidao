package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.Book;
import me.zhucai.bean.UserInfo;
import me.zhucai.exception.MyFileNotFoundException;
import me.zhucai.mapper.BookMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/rest")
public class BookDetailController {

    private static final Logger logger = LogManager.getLogger(BookDetailController.class);

    @Autowired
    public BookMapper bookMapper;

    /**
     * 下载电子书
     * http://localhost:8081/downloadBook/873b29547b2b47d7bce9a572121c7303
     */
    @GetMapping("/downloadBook/{uuid}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String uuid, HttpServletRequest request) throws UnsupportedEncodingException {
        //验证下载次数超限
        Subject subject = SecurityUtils.getSubject();
        UserInfo userInfo = (UserInfo) subject.getPrincipal();
        Book book = bookMapper.findBookById_NoContent(uuid);
        String filePath = book.getPath() + "\\" + book.getFilename() + ".epub";
        logger.info("Downloading:" + filePath);
        // Load file as Resource
        Resource resource = null;
        try {
            Path path = Paths.get(filePath).toAbsolutePath().normalize();
            resource = new UrlResource(path.toUri());
            if (!resource.exists()) {
                throw new MyFileNotFoundException("File not found " + book.getFilename());
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + book.getFilename(), ex);
        }
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_TYPE, "application/epub+zip;charset=UTF-8")
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + URLEncoder.encode(book.getTitle(), "UTF-8") + ".epub\"")
                .body(resource);
    }


    @PostMapping("/book/detail/{id}")
    public String getBookDetail(HttpServletRequest request, @PathVariable("id") String id, @RequestBody JSONObject queryJson) {
        String txt = queryJson.getString("text");
        if (StringUtils.isBlank(txt)) {
            logger.error("查询字符为空 getBookDetail id:" + id + ",queryTxt:" + txt);
            return "查询字符为空";
        }
        logger.info("getBookDetail id:" + id + ",queryTxt:" + txt);
        Book book = bookMapper.findBookById_HasContent(id);
        String content = book.getContent();
        try {
            String subContent = getContentFromEndPageSizeByTxt(id, content, txt);//fromEndIdx:{from, end, pageSize}
            StringBuffer html = new StringBuffer();
            subContent = subContent.replaceAll("\r", "");//去掉回车，保留换行
            for (String line : subContent.split("\n")) {
                html.append(line).append("</br>");
            }
            return html.toString();
        } catch (RuntimeException e) {
            logger.error("查询内容含有非法字符,返回查询值:" + txt);
            return "查询内容含有非法字符,返回查询值:<br>" + txt;
        }
    }


    /**
     * 根据关键词，获取from end pageSize
     *
     * @param content
     * @param txt     关键词
     * @return
     */
    public String getContentFromEndPageSizeByTxt(String id, String content, String txt) {
        int baseLength = 2000;
        int from = 0;
        int end = 0;
        int pageSize = 1;
        int length = content.length();
        //发现chrome的innerHTML方法，会把所有\r转成\n，所以浏览器传入的只有\n
        content = content.replaceAll("\r", "\n");
        StringBuffer stringBuffer = new StringBuffer(content);
        int idx = content.indexOf(txt);
        if (idx == -1) {//找不到文本
            logger.error("error while searching txt in book id:" + id + ",idx:" + idx);
            logger.error("searching txt is :");
            logger.error(txt);
            throw new RuntimeException("找不到文本");
        }
        //找到文本
        if (idx - baseLength / 2 < 0) {
            from = 0;
        } else {
            from = idx - baseLength / 2;
        }
        if (idx + baseLength / 2 > length) {
            end = length;
        } else {
            end = idx + baseLength / 2;
        }
        if (length <= baseLength) {
            pageSize = 1;
        } else {
            pageSize = length / baseLength + 1;
        }
        stringBuffer.insert(idx, "<em>");
        stringBuffer.insert(idx + txt.length() + 4, "</em>");
        String subStr = stringBuffer.substring(from, end);
        return subStr;
    }

    /**
     * 根据起始号，获取截取后的文本
     *
     * @param content 原文
     * @param txt     搜索字符（用于高亮）
     * @param from    起始index
     * @param end     结束index
     * @return
     */
    public String getSubContentByFromEnd(String content, String txt, int from, int end) {
        content = content.substring(from, end);
        return content;
    }


    public static void main(String[] args) {
        String txt = "古城传奇$n$n帕尔米拉位于叙利$n亚中部，因其名“沙漠新娘”而著称，是旅行者穿越叙利亚沙漠的必经之地。";
        txt = txt.replaceAll("\\$r", "\r").replaceAll("\\$n", "\n");
        System.out.println(txt);
    }

}
