package me.zhucai.generator;

import me.zhucai.generator.bean.ColumInfo;
import me.zhucai.generator.bean.TableInfo;

import java.util.List;

public class JavaMapperGenerator {

    public static void print(TableInfo tableInfo){
        List<ColumInfo> columInfos = tableInfo.getColumInfos();
        for (ColumInfo columInfo : columInfos) {
            String n = columInfo.getName();
        }
    }

}
