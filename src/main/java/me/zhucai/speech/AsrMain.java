package me.zhucai.speech;


import com.alibaba.fastjson.JSONObject;
import me.zhucai.util.ConstantUtil;
import me.zhucai.util.FileNameUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;


/**
 * https://ai.baidu.com/docs#/ASR-API/top
 *
 */
public class AsrMain {

    private static final Logger logger = LoggerFactory.getLogger(AsrMain.class);

    private final boolean METHOD_RAW = false; // 默认以json方式上传音频文件

    //  填写网页上申请的appkey 如 $apiKey="g8eBUMSokVB1BHGmgxxxxxx"
    private final String APP_KEY = "Zmrd33RucYWR2IOCiVyGYc6b";

    // 填写网页上申请的APP SECRET 如 $SECRET_KEY="94dc99566550d87f8fa8ece112xxxxx"
    private final String SECRET_KEY = "2k7712vUK5hkIwps5kL8KyrI0CY6HaHM";

    // 需要识别的文件
//    private final String FILENAME = "AI.未来.pcm";
//    private static String FILENAME = "d:/tmp/0.pcm";

    // 文件格式, 只支持pcm/wav/amr
//    private static String FORMAT = FILENAME.substring(FILENAME.length() - 3);


    private String CUID = "1234567JAVA";

    // 采样率固定值
    private final int RATE = 16000;

    private String URL;

    private int DEV_PID;

    private String SCOPE;

    //  免费版 参数
    {
        URL = "http://vop.baidu.com/server_api"; // 可以改为https
        //  1537 表示识别普通话，使用输入法模型。1536表示识别普通话，使用搜索模型。 其它语种参见文档
        DEV_PID = 1537;
        SCOPE = "audio_voice_assistant_get";
    }

    /* 付费极速版 参数
    {
        URL =   "http://vop.baidu.com/pro_api"; // 可以改为https
        DEV_PID = 80001;
        SCOPE = "brain_enhanced_asr";
    }
    */

    /* 忽略scope检查，非常旧的应用可能没有
    {
        SCOPE = null;
    }
    */

    public static void main(String[] args) throws IOException {
        AsrMain demo = new AsrMain();
        List<String> list = new FileNameUtil().getFilesInDir(ConstantUtil.RADIO_SPLIT_TMP_DIR);
        File lastResultFile = new File(ConstantUtil.RADIO_SPLIT_TMP_DIR + "result.txt");
        lastResultFile.delete();
        File resultFile = new File(ConstantUtil.RADIO_SPLIT_TMP_DIR + "result.txt");
        FileWriter fo = new FileWriter(resultFile);
//        StringBuffer sb = new StringBuffer();
        for (String fileName : list) {
            if (fileName.indexOf(".pcm") == -1) {
                continue;
            }
            try {
                String pcmFile = ConstantUtil.RADIO_SPLIT_TMP_DIR + fileName;
                String result = demo.run(pcmFile);
                JSONObject json = JSONObject.parseObject(result);
                if (json.getString("err_msg").equals("success.")) {
                    String txt = json.getJSONArray("result").getString(0);
//                    sb.append(txt);
                    fo.write(txt);
                    System.out.print(txt);
//                    logger.info("识别结果长度:" + txt.length());
                } else {
                    logger.info("音频转文字错误:");
                    logger.info(result);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // 如果显示乱码，请打开result.txt查看
        fo.close();
        logger.info("Result also wrote into " + resultFile.getAbsolutePath());
    }


    public String run(String pcmFile) throws IOException {
        TokenHolder holder = new TokenHolder(APP_KEY, SECRET_KEY, SCOPE);
        holder.resfresh();
        String token = holder.getToken();
        String result = runJsonPostMethod(token, pcmFile);
        return result;
    }


    public String runJsonPostMethod(String token, String pcmFile) throws IOException {
        byte[] content = getFileContent(pcmFile);
        String speech = base64Encode(content);
        JSONObject params = new JSONObject();
        params.put("dev_pid", DEV_PID);
        params.put("format", pcmFile.substring(pcmFile.length() - 3));
        params.put("rate", RATE);
        params.put("token", token);
        params.put("cuid", CUID);
        params.put("channel", "1");
        params.put("len", content.length);
        params.put("speech", speech);

        // logger.info(params.toString());
        HttpURLConnection conn = (HttpURLConnection) new URL(URL).openConnection();
        conn.setConnectTimeout(5000);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        conn.setDoOutput(true);
        conn.getOutputStream().write(params.toString().getBytes());
        conn.getOutputStream().close();
        String result = ConnUtil.getResponseString(conn);


        params.put("speech", "base64Encode(getFileContent(FILENAME))");
//        logger.info("url is : " + URL);
//        logger.info("params is :" + params.toString());


        return result;

//        return "{\"corpus_no\":\"6694503712249013503\",\"err_msg\":\"success.\",\"err_no\":0,\"result\":[\"科研产品啊，技术商业化，所以从多视角来看这个问题啊，我希望能够更更完整，而且都不算是科普了，这个就是一个普了能让每个人都读懂的一本书，而且了解未来会有多重要，咱们先说说最抢眼的是最近网上我看到特别多，这个人工智能的那些小片段，比如说昨天有人转发一个像人一样的一个，而且做成红色的就很像那个去了皮的人一样，在大街上走，一边走一边看，就特别像一个闲逛的人，还有一个公司做的是可以翻跟头，自己哪里像个屁股就跑掉了一个机器人？还有可以送快递的机器人，可以炒菜的机器人可以跳芭蕾舞的，你写中国书法的，这里边哪一种算是最先进？呃，我相信你讲的每一种都有闲心的技术在里面，但是其实我们看到的。\"],\"sn\":\"213835336641558685608\"}";
    }

    private byte[] getFileContent(String filename) throws IOException {
        File file = new File(filename);
        if (!file.canRead()) {
            System.err.println("文件不存在或者不可读: " + file.getAbsolutePath());
            throw new RuntimeException("file cannot read: " + file.getAbsolutePath());
        }
        FileInputStream is = null;
        try {
            is = new FileInputStream(file);
            return ConnUtil.getInputStreamContent(is);
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    private String base64Encode(byte[] content) {
        /**
         Base64.Encoder encoder = Base64.getEncoder(); // JDK 1.8  推荐方法
         String str = encoder.encodeToString(content);
         **/

        char[] chars = Base64Util.encode(content); // 1.7 及以下，不推荐，请自行跟换相关库
        String str = new String(chars);

        return str;
    }

}
