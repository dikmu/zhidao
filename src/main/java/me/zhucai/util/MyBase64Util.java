package me.zhucai.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public class MyBase64Util {

    //编码
    public static String encode(String txt) throws UnsupportedEncodingException {
        BASE64Encoder encoder = new BASE64Encoder();
        byte[] textByte = txt.getBytes("UTF-8");
        return encoder.encode(textByte);
    }

    //解码
    public static String decode(String encodedText) throws IOException {
        BASE64Decoder decoder = new BASE64Decoder();
        return new String(decoder.decodeBuffer(encodedText), "UTF-8");
    }

    public static void main(String[] args) throws Exception {
        final BASE64Encoder encoder = new BASE64Encoder();
        final BASE64Decoder decoder = new BASE64Decoder();
        final String text = "加密此文本";
        final byte[] textByte = text.getBytes("UTF-8");
        //编码
        final String encodedText = encoder.encode(textByte);
        System.out.println(encodedText);
        //解码
        System.out.println(new String(decoder.decodeBuffer(encodedText), "UTF-8"));
    }

}
