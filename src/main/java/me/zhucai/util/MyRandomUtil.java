package me.zhucai.util;

public class MyRandomUtil {

    /**
     * 生成指定位数的随机数
     * 例如4,生成4位数5172
     * @param digits 位数
     * @return
     */
    public static int genRandomInt(int digits) {
        digits = digits - 1;
        return (int) ((Math.random() * 9 + 1) * Math.pow(10, digits));
    }

    public static void main(String[] args) {
        System.out.println(genRandomInt(4));
    }

}
