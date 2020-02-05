package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class EsRest {

    public static final String TEMP_FILE_DIR = "E:/ws_epub/TempFile/";

    public static RestHighLevelClient client = new RestHighLevelClient(
            RestClient.builder(
                    new HttpHost("localhost", 9200, "http")));

    public String getSearchDetail(String bookId, String queryTxt) {
        String filePath = getBookInTempFile(bookId);
        if (filePath == null) {
            getTempFileContentByQueryStr(filePath, queryTxt);
        } else {
            filePath = (String) createTempFile(bookId);
        }
        return getTempFileContentByQueryStr(filePath, queryTxt);
    }

    public String getBookInTempFile(String bookId) {
        return null;
    }

    public void getBookFromEsById(String bookId) {

    }

    public static Object createTempFile(String bookId) {

        return "";
    }

    public static String getTxtFilePath(String id) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity responseEntity = restTemplate.getForEntity("http://localhost:9200/store/epub/" + id + "?_source_include=DirPath,FileName", JSONObject.class);
        JSONObject jsonObject = (JSONObject) responseEntity.getBody();
        String dirPath = jsonObject.getJSONObject("_source").getString("DirPath");
        String fileName = jsonObject.getJSONObject("_source").getString("FileName");
        return dirPath + "\\" + fileName + ".txt";
    }

    public String getTempFileContentByQueryStr(String filePath, String queryTxt) {
        return null;
    }

    public static String queryFileContent(String filePath, String queryTxt) throws IOException {
        System.out.println(queryTxt);
        queryTxt = queryTxt.replaceAll("<em>", "").replaceAll("</em>", "");
        File txtFile = new File(filePath);
        if (!txtFile.exists()) {
            return null;
        }
        if (txtFile.exists()) {
            //获取正文
            BufferedReader br = new BufferedReader(new FileReader(txtFile));
            try {

                String line = br.readLine();
                br.mark(1);
                //获取查询字符串所在位置
                long index = 0;
                while (line != null) {
                    index++;
                    line = br.readLine();
                    if (line.indexOf(queryTxt) != -1) {
                        break;
                    }
                }
                //
                long startI=index-100;
                long endI=index+100;
                if(startI<0){
                    startI=0;
                }
                //重新读取文件
                br.reset();
                StringBuilder sb = new StringBuilder();
                line = br.readLine();
                long index2 = 0;
                while (line != null) {
                    index2++;
                    if(startI<=index2 || index2<=endI){
                        sb.append(line);
                        sb.append(System.lineSeparator());
                        line = br.readLine();
                    }
                    if(index2>endI){
                        break;
                    }
                }
            } finally {
                br.close();
            }
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        String filePath = getTxtFilePath("a2d92096a04e3acbb5ac686d28e82a10");
        System.out.println(filePath);
        queryFileContent(filePath, "<em>西</em><em>夏</em>攻打金国，当然不可能讨到便宜，金国比蒙古弱，但比<em>西</em><em>夏</em>还是强的，<em>西</em><em>夏</em>军无功而返。转过年来，李安全就被干掉了。<em>西</em><em>夏</em>的宗室——齐王李遵顼杀掉李安全自立，李遵顼就是<em>夏</em>神宗。");
    }

}
