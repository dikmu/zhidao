package me.zhucai.util;

import com.alibaba.fastjson.JSONObject;

public class MyClassToJsonUtil {

    public static JSONObject convertObject(Object obj , String ... fields ) throws NoSuchFieldException {
        JSONObject jsonObject = new JSONObject();
        for (String field:fields){
            jsonObject.put(field,obj.getClass().getDeclaredField(field));
        }
        return jsonObject;
    }

}
