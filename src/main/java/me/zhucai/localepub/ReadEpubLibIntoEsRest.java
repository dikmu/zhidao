package me.zhucai.localepub;

import me.zhucai.util.ConstantUtil;
import me.zhucai.util.CyptUtil;
import me.zhucai.util.StringUtil;
import org.apache.http.HttpHost;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.ByteBuffer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@SpringBootApplication
public class ReadEpubLibIntoEsRest {

    static boolean pushToES = false;

    public static int maxcount = 0;
    int GlobalIndex = 1;//Book ID

    RestHighLevelClient client = null;

    File or;
    File[] files;
    public static Set<EpubMeta> EPUB_META_SET = new HashSet<>();

    Set<String> LocalBookSet = new HashSet<>();

    /**
     * 解析opf文件，即calibre的meta文件
     *
     * @return EpubMeta对象
     * @throws DocumentException
     */
    public EpubMeta opf2EpubMeta(File file, String filterIds) throws DocumentException {
        EpubMeta epubMeta = new EpubMeta();
        SAXReader reader = new SAXReader();
        epubMeta.setDirPath(file.getParentFile().getAbsolutePath());
        epubMeta.setFileName(getTxtFileName(file.getParentFile()));
        Document document = reader.read(file);
        Element root = document.getRootElement();
        List<Element> es = root.elements().get(0).elements();
        for (Element e : es) {
            if (e.getName().equals("identifier")) {
                List<Attribute> attrs = e.attributes();
                for (Attribute attr : attrs) {
                    if (attr.getValue().equals("calibre_id")) {
                        epubMeta.setCalibreId(Long.parseLong(e.getStringValue()));
                        if (filterIds.indexOf(epubMeta.getCalibreId().toString() + ",") != -1) {
                            return null;
                        }
                    } else if (attr.getValue().equals("MOBI-ASIN")) {
                        epubMeta.setMobiAsin(e.getStringValue());
                    } else if (attr.getValue().equals("uuid_id")) {
                        epubMeta.setUuid(e.getStringValue());
                    } else if (attr.getValue().equals("ISBN")) {
                        epubMeta.setIsbn(e.getStringValue());
                    } else if (attr.getValue().equals("ASIN")) {
                        epubMeta.setAsin(e.getStringValue());
                    }
                }
            }
            if (e.getName().equals("title")) {
                epubMeta.setTitle(e.getStringValue());
            }
            if (e.getName().equals("creator")) {
                epubMeta.addCreator(e.getStringValue());
            }
            if (e.getName().equals("date")) {
                try {
                    String s = e.getStringValue();
                    s = s.substring(0, s.indexOf("T"));
                    epubMeta.setDate(new SimpleDateFormat("yyyy-MM-dd").parse(s));
                } catch (ParseException e1) {
                    e1.printStackTrace();
                }
            }
            if (e.getName().equals("language")) {
                epubMeta.setLanguage(e.getStringValue());
            }
            if (e.getName().equals("description")) {
                String s = StringUtil.delHTMLTag(e.getStringValue());
                if (s.length() > 10) {
                    epubMeta.setDescription(s);
                }
            }
        }
        return epubMeta;
    }


    /**
     * 获取同目录下txt文件的名称
     *
     * @param dirFile
     * @return
     */
    private String getTxtFileName(File dirFile) {
        File[] files = dirFile.listFiles();
        for (File file : files) {
            if (file.isFile() && file.getName().indexOf(".txt") != -1) {
                return file.getName().replaceAll(".txt", "");
            }
        }
        return null;
    }


    /**
     * 顺序处理所有epub
     */
    public void iteratorCalibreLib(String dir, String filterIds, String totalFile, String idsFile) throws Exception {
        File fileTotal = new File(totalFile);
        File fileIds = new File(idsFile);
        ByteBuffer byteBuffer = ByteBuffer.wrap("".getBytes());
        FileOutputStream fos = new FileOutputStream(fileTotal, true);
        FileOutputStream fos2 = new FileOutputStream(fileIds, true);
        try {
            or = new File(dir);
            files = or.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && file.getName().indexOf(".opf") != -1) {
                        try {
                            EpubMeta epubMeta = opf2EpubMeta(file, filterIds);
                            if (epubMeta == null) {
                                //此书已转换过，并记录到ids文件中
                                GlobalIndex++;
                                System.out.println(GlobalIndex);
                                continue;
                            } else {
                                boolean success = writeBookToELK(epubMeta);
                                fos.write(("{'CalibreId':'" + epubMeta.getCalibreId() + "','Title':'" + epubMeta.getTitle()
                                        + "','success':'" + success + "'},\n").getBytes());
                                fos2.write((epubMeta.getCalibreId() + ",").getBytes());
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    } else if (file.isDirectory()) {
                        iteratorCalibreLib(file.getAbsolutePath(), filterIds, totalFile, idsFile);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            fos.flush();
            fos.close();
            fos2.flush();
            fos2.close();
        }

    }

    public boolean writeBookToELK(EpubMeta epubMeta) throws Exception {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("AddedDate", new Date());
        jsonMap.put("Authors", epubMeta.getAllCreator());
        jsonMap.put("Dates", epubMeta.getDate());
        jsonMap.put("DirPath", epubMeta.getRelatedPath());
        if (StringUtil.isNotBlank(epubMeta.getDescription())) {
            jsonMap.put("Descriptions", epubMeta.getDescription());
        }
        jsonMap.put("Language", epubMeta.getLanguage());
        jsonMap.put("Title", epubMeta.getTitle());
        jsonMap.put("FileName", epubMeta.getFileName());
        jsonMap.put("CalibreId", epubMeta.getCalibreId());
        if (StringUtil.isNotBlank(epubMeta.getMobiAsin())) {
            jsonMap.put("MobiAsin", epubMeta.getMobiAsin());
        }
        if (StringUtil.isNotBlank(epubMeta.getAsin())) {
            jsonMap.put("Asin", epubMeta.getAsin());
        }
        if (StringUtil.isNotBlank(epubMeta.getIsbn())) {
            jsonMap.put("Isbn", epubMeta.getIsbn());
        }
        jsonMap.put("uuid", epubMeta.getUuid());
        File txtFile = new File(epubMeta.getTxtPath());
        boolean hasTxt = false;
        if (txtFile.exists()) {
            //获取正文
            BufferedReader br = new BufferedReader(new FileReader(txtFile));
            try {
                StringBuilder sb = new StringBuilder();
                String line = br.readLine();
                while (line != null) {
                    sb.append(line);
                    sb.append(System.lineSeparator());
                    line = br.readLine();
                }
                String content = sb.toString();
                if (content != null && !content.trim().equals("")) {
                    jsonMap.put("Content", content);
                    jsonMap.put("ContentMd5", CyptUtil.md5(content));
                    hasTxt = true;
                } else {
                    System.out.println("找不到txt");
                }
            } finally {
                br.close();
            }
        } else {
            System.out.println("找不到txt");
        }
        jsonMap.put("HasTxt", hasTxt);
        String titleMd5 = CyptUtil.md5(epubMeta.getTitle());
        IndexRequest request = new IndexRequest("store", "epub", titleMd5).source(jsonMap);
        GlobalIndex++;
        try {
            if (pushToES) {
                IndexResponse indexResponse = client.index(request);
                System.out.println(
                        "Status:" + indexResponse.status() + ",Title:" + jsonMap.get("Title") + ",TitleMD5:" + titleMd5
                                + ",GlobalIndex" + GlobalIndex);
            } else {
                System.out.println(
                        "Status: not push" + ",Title:" + jsonMap.get("Title") + ",TitleMD5:" + titleMd5 + ",GlobalIndex"
                                + GlobalIndex);
            }
            //            System.out.println(indexResponse);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getIdsFromIdsFile(String idsFile) {
        try (BufferedReader br = new BufferedReader(new FileReader(idsFile))) {
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
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

    /**
     * 刷新正常书库
     *
     * @return
     */
    @GetMapping(path = "readEpubLibIntoELK")
    public String run() {
        client = new RestHighLevelClient(RestClient.builder(new HttpHost("localhost", 9200, "http")));
        try {
            iteratorCalibreLib(ConstantUtil.LOCAL_EPUB_LIB_DIR, getIdsFromIdsFile(ConstantUtil.LOCAL_EPUB_IDS), ConstantUtil.LOCAL_EPUB_TOTAL, ConstantUtil.LOCAL_EPUB_IDS);
            iteratorCalibreLib(ConstantUtil.LOCAL_EPUB_LIB_DIR_ERROR, getIdsFromIdsFile(ConstantUtil.LOCAL_EPUB_IDS_ERROR), ConstantUtil.LOCAL_EPUB_TOTAL_ERROR, ConstantUtil.LOCAL_EPUB_IDS_ERROR);
            return "ok";
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                client.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("over");
        }
        return null;
    }


}
