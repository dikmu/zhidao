package me.zhucai.localmp3;

import me.zhucai.util.ConstantUtil;
import me.zhucai.util.FileNameUtil;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * 验证过的命令：
 * 截取指定时长的音频 ffmpeg -i AI.未来.mp3 -vn -acodec copy -ss 00:20:00 -t 00:01:00 AI.未来2.mp3
 * mp3转换为pcm  ffmpeg -y  -i aidemo.mp3  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 16k.pcm
 * 显示音频信息，包括总时长   ffprobe -show_format AI.未来.mp3
 *
 * 参考资料：
 * ffprobe,ffplay ffmpeg常用的命令行命令 https://juejin.im/post/5a59993cf265da3e4f0a1e4b
 */
public class RadioSplitUtil {

    public void splitMp3(String sourceRadio, String outputRadio, String startTime, String durTime) throws IOException {
        String command = ConstantUtil.FFMPEG_CMD_SPLIT_MP3.replace("#{source_file}", sourceRadio).replace("#{output_file}", outputRadio).replace("#{start_time}", startTime).replace("#{dur_time}", durTime);
//        String command="D:\\apps\\ffmpeg\\bin\\ffmpeg -i D:\\apps\\ffmpeg\\bin\\AI.未来.mp3 -vn -acodec copy -ss 00:00:00 -t 00:01:00 D:\\apps\\ffmpeg\\bin\\AI.未来4.mp3";
        Runtime runtime = Runtime.getRuntime();
        Process process = runtime.exec(command);
//        Process process = runtime.exec("D:/apps/ffmpeg/bin/ffprobe -show_format D:/apps/ffmpeg/bin/AI.未来.mp3");
        BufferedReader bufferedReader = new BufferedReader
                (new InputStreamReader(process.getInputStream()));

        String line = null;
        StringBuilder sb = new StringBuilder();
        while ((line = bufferedReader.readLine()) != null) {
            sb.append(line + "\n");
            System.out.println(line);
        }
    }

    /**
     * 获取音频总时长
     *
     * @param file
     * @return 3816.3438秒  即  3816.3438/60=63.xx分钟
     * @throws IOException
     */
    public Float getMp3Length(String file) throws IOException {
        Process process = Runtime.getRuntime().exec("D:/apps/ffmpeg/bin/ffprobe -show_format D:/apps/ffmpeg/bin/AI.未来.mp3");
        BufferedReader bufferedReader = new BufferedReader
                (new InputStreamReader(process.getInputStream()));
        String line = null;
        while ((line = bufferedReader.readLine()) != null) {
            if (line.startsWith("duration")) {
                String lenStr = line.split("=")[1];
                return Float.parseFloat(lenStr);
            }
        }
        return null;
    }

    public List<String> splitRadioIntoMinite(String sourceFile) throws IOException {
        List<String> list = new ArrayList<>();
        int radioLength = ((Double) Math.floor(getMp3Length(sourceFile))).intValue();
        System.out.println("文件：" + sourceFile + " 时长：" + radioLength);
        clearDir(ConstantUtil.RADIO_SPLIT_TMP_DIR);
        for (int i = 0; i < radioLength / 60 + 1; i++) {
            String durTime = "00:01:00";
            if (radioLength - i * 60 < 60) {
                durTime = secToTime(radioLength - i * 60);
            }
            System.out.println(i + "  " + secToTime(i * 60) + "   " + durTime);
            String outFile = ConstantUtil.RADIO_SPLIT_TMP_DIR + i + ".mp3";
            splitMp3(sourceFile, outFile, secToTime(i * 60), durTime);
            list.add(outFile);
        }
        return list;
    }

    private void clearDir(String path) {
        List<String> list = new FileNameUtil().getFilesInDir(path);
        for (String file : list) {
            try {
                new File(path + file).delete();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 整数(秒数)转换为时分秒格式(xx:xx:xx)
     *
     * @param time
     * @return
     */
    public static String secToTime(int time) {
        String timeStr = null;
        int hour = 0;
        int minute = 0;
        int second = 0;
        if (time <= 0)
            return "00:00:00";
        else {
            minute = time / 60;
            if (minute < 60) {
                second = time % 60;
                timeStr = unitFormat(minute) + ":" + unitFormat(second);
                timeStr = "00:" + timeStr;
            } else {
                hour = minute / 60;
                if (hour > 99)
                    return "99:59:59";
                minute = minute % 60;
                second = time - hour * 3600 - minute * 60;
                timeStr = unitFormat(hour) + ":" + unitFormat(minute) + ":" + unitFormat(second);
            }
        }
        return timeStr;
    }

    private static String unitFormat(int i) {
        String retStr = null;
        if (i >= 0 && i < 10)
            retStr = "0" + Integer.toString(i);
        else
            retStr = "" + i;
        return retStr;
    }


    public static void main(String[] args) throws IOException {
//        try {
//            new RadioSplitUtil().splitMp3("D:/apps/ffmpeg/bin/AI.未来.mp3", "d:/tmp/","00:00:00","00:01:00");
//            Float length = new RadioSplitUtil().getMp3Length("D:/apps/ffmpeg/bin/AI.未来.mp3");
//            System.out.println(length);
        new RadioSplitUtil().splitRadioIntoMinite("F:\\FFOutput\\20190416_160347孙丽丹老师.mp3");
//        new RadioSplitUtil().clearDir(ConstantUtil.RADIO_SPLIT_TMP_DIR);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }
}
