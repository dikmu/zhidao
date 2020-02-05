package me.zhucai.util;

public class ConstantUtil {
    
//    public static String EPUB_DIR = "E:\\epub_wd\\epub";
//    public static String EPUB_DIR_2 = "J:\\电子书\\epub_all";//移动硬盘
//    public static String ELK_SERVER_HOST = "http://127.0.0.1:9200/store/epub";
//    public static String EPUBEE_SCREEN_SHOT_FILE = "E:\\epub抓取";

    public static final String LOCAL_EPUB_IDS="E:\\WS\\ws_github\\calibre 书库\\Ids.txt";
    public static final String LOCAL_EPUB_IDS_ERROR="E:\\WS\\ws_github\\calibre 书库\\Ids_error.txt";
    public static final String LOCAL_EPUB_TOTAL="E:\\WS\\ws_github\\calibre 书库\\Total.txt";
    public static final String LOCAL_EPUB_TOTAL_ERROR="E:\\WS\\ws_github\\calibre 书库\\Total_error.txt";

//    public static final String LOCAL_EPUB_IDS = "D:\\WS\\ws_github\\calibre 书库2\\Ids.txt";
//    public static final String LOCAL_EPUB_IDS_ERROR = "D:\\WS\\ws_github\\calibre 书库2\\Ids_error.txt";
//    public static final String LOCAL_EPUB_TOTAL = "D:\\WS\\ws_github\\calibre 书库2\\Total.txt";
//    public static final String LOCAL_EPUB_TOTAL_ERROR = "D:\\WS\\ws_github\\calibre 书库2\\Total_error.txt";

//    public static final String LOCAL_EPUB_IDS="D:\\WS\\ws_github\\calibre 书库3\\Ids.txt";
//    public static final String LOCAL_EPUB_IDS_ERROR="D:\\WS\\ws_github\\calibre 书库3\\Ids_error.txt";
//    public static final String LOCAL_EPUB_TOTAL="D:\\WS\\ws_github\\calibre 书库3\\Total.txt";
//    public static final String LOCAL_EPUB_TOTAL_ERROR="D:\\WS\\ws_github\\calibre 书库3\\Total_error.txt";


    public static final String LOCAL_EPUB_LIB_DIR = "E:\\BookLib\\calibre 书库";//指向Calibre的目录
    public static final String LOCAL_EPUB_LIB_DIR_ERROR = "E:\\BookLib\\问题书库";//指向Calibre的目录
    public static final String LOCAL_EPUB_EPUB_TEMP_FILE = "E:\\WS\\ws_github\\calibre 书库\\EpubTempFile.txt";
    public static final String NEW_EPUB_DIR = "E:\\BookLib\\new_epub";//新下载的，


//    public static final String ES_INDEX = "store";
//    public static final String ES_TYPE = "epub";

    //-------------------------音频 mp3 语音识别配置----------------------------------------------------


    public static final String FFMPEG="E:\\apps\\ffmpeg\\bin\\ffmpeg";

    public static final String FFMPEG_CMD_SPLIT_MP3 = FFMPEG + " -i #{source_file} -vn -acodec copy -ss #{start_time} -t #{dur_time} #{output_file}";

    public static final String FFMPEG_CMD_CONVERT_MP3_2_PCM = FFMPEG + " -y  -i #{source_file} -acodec pcm_s16le -f s16le -ac 1 -ar 16000 #{output_file}";

    public static final String RADIO_SPLIT_TMP_DIR="E:/apps/ffmpeg/tmp";


}
