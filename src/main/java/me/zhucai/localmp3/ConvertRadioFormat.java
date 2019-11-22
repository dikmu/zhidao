package me.zhucai.localmp3;

import me.zhucai.util.ConstantUtil;
import me.zhucai.util.FileNameUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

/**
 * Used Only for Windows CMD
 */
public class ConvertRadioFormat {

    public void convertMp3toPcm(String file) throws IOException {
        String pcm = file.replace(".mp3", ".pcm");
        String command = ConstantUtil.FFMPEG_CMD_CONVERT_MP3_2_PCM.replace("#{source_file}", file).replace("#{output_file}", pcm);
        System.out.println(command);
        Runtime runtime = Runtime.getRuntime();
        Process process = runtime.exec(command);
        BufferedReader bufferedReader = new BufferedReader
                (new InputStreamReader(process.getInputStream()));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while ((line = bufferedReader.readLine()) != null) {
            sb.append(line + "\n");
            System.out.println(line);
        }
    }

    public void convertDirToPcm(String dir) {
        List<String> list = new FileNameUtil().getFilesInDir(dir);
        for (String file : list) {
            try {
                convertMp3toPcm(dir + file);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws Exception {
        new ConvertRadioFormat().convertDirToPcm(ConstantUtil.RADIO_SPLIT_TMP_DIR);
    }

}
