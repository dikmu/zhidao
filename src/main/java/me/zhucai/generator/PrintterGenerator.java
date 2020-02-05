package me.zhucai.generator;

import me.zhucai.generator.bean.ColumInfo;
import me.zhucai.generator.bean.TableInfo;

import java.util.ArrayList;
import java.util.List;

public class PrintterGenerator {

    /**
     * 打印为JavaBean使用的Field列表
     *
     * @param tableInfo
     */
    public static void printBeanFields(TableInfo tableInfo) {
        List<ColumInfo> columInfos = tableInfo.getColumInfos();
        for (ColumInfo columInfo : columInfos) {
            String t = columInfo.getType().replace("java.lang.", "");
            String n = columInfo.getName();
            System.out.println(t + " " + change_(n));
        }
    }

    /**
     * 打印为Mapper使用的Field列表
     *
     * @param tableInfo
     */
    public static void printMappperFields(TableInfo tableInfo) {
        List<ColumInfo> columInfos = tableInfo.getColumInfos();
        List<String> list = new ArrayList<>();
        for (ColumInfo columInfo : columInfos) {
            String n = columInfo.getName();
            list.add("#{" + change_(n) + "}");
        }
        String str=list.toString();
        System.out.println(str.substring(1,str.length()-1));
    }

    /**
     * 将带有下划线的字符串改为驼峰命名法
     *
     * @param name user_id
     * @return userId
     */
    private static String change_(String name) {
        StringBuffer stringBuffer = new StringBuffer("");
        char cc;
        boolean is_ = false;
        for (int i = 0; i < name.length(); i++) {
            cc = name.charAt(i);
            if (cc == '_') {
                is_ = true;
            } else if (is_) {
                is_ = false;
                stringBuffer.append(("" + cc).toUpperCase());
            } else {
                stringBuffer.append(cc);
            }
        }
        return stringBuffer.toString();
    }

}
