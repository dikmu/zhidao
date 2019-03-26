package me.zhucai.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class AutoConfigUtil {

    public static final String TABLE_NAME = "USER_INFO";
    public static final String ATTRS_SELECT = "`UID`,`USERNAME`,`NAME`,`PASSWORD`,`SALT`,`STATE`";
    public static final String ATTRS_INSERT = "UID,USERNAME,NAME,PASSWORD,SALT,STATE";
    public static final String ATTRS_UPDATE = "`USERNAME`,`NAME`,`PASSWORD`,`SALT`,`STATE`";

    /**
     * uid,username,name,password,salt,state
     *
     * @param bean
     * @return
     */
    public static String generateMapperSQL(Class bean, String TableName, String[] ids, String orderBy) {
        Field[] fields = bean.getDeclaredFields();
        List insertList = new ArrayList();
        List selectList = new ArrayList();
        StringBuffer updateSB = new StringBuffer("<script>UPDATE " + TableName + " <set>");
        for (int i = 0; i < fields.length; i++) {
            Field f = fields[i];
            //判断主键
            boolean isKey = false;
            for (String id : ids) {
                if (id.equalsIgnoreCase(f.getName())) {
                    isKey = true;
                    break;
                }
            }
            //insert select
            insertList.add(f.getName().toUpperCase());
            selectList.add("#{" + f.getName().toUpperCase() + "}");
            //update
            if (!isKey) {//排除主键,主键不执行update
                if (i == fields.length - 1) {
                    updateSB.append("<if test='" + f.getName().toUpperCase() + "!=null'>" + f.getName().toUpperCase() + "=#{" + f.getName().toUpperCase() + "}</if>");
                } else {
                    updateSB.append("<if test='" + f.getName().toUpperCase() + "!=null'>" + f.getName().toUpperCase() + "=#{" + f.getName().toUpperCase() + "},</if>");
                }
            }
        }
        String o = insertList.toString().substring(1, insertList.toString().length() - 1).replaceAll(" ", "");
        String o2 = selectList.toString().substring(1, selectList.toString().length() - 1).replaceAll(" ", "");
        System.out.println("public static final String TABLE_NAME = \"" + TableName + "\";");
        System.out.println("public static final String SQL_INSERT = \"INSERT INTO " + TableName + "(" + o + ") VALUES (" + o2 + ")\";");
        System.out.println("public static final String SQL_GET_ALL = \"SELECT " + o + " FROM " + TableName + " ORDER BY UID\";");
        System.out.println("public static final String SQL_FILTER = \"SELECT " + o + " FROM " + TableName + " WHERE NAME LIKE '%#{NAME}%' ORDER BY UID\";");
        System.out.println("public static final String SQL_SELECT = \"SELECT " + o + " FROM " + TableName + " WHERE UID = #{UID} ORDER BY UID\";");
        updateSB.append("</set><where>UID=#{UID}</where></script>");
        System.out.println("public static final String SQL_UPDATE = \"" + updateSB + "\";");
        System.out.println("public static final String SQL_DELETE = \"DELETE FROM " + TableName + " WHERE UID = #{UID}\";");
        return "ok";
    }


    public static void main(String[] args) {
        generateMapperSQL(me.zhucai.bean.Template.class, "TEMPLATE", new String[]{"UID"}, "UID");
    }
}
