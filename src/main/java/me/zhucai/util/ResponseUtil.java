package me.zhucai.util;

import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static ResponseEntity inputParamError(){
        return ResponseEntity.status(400).body("参数错误");
    }

    public static ResponseEntity userOperateTooFast(){
        return ResponseEntity.status(500).body("操作太快，请慢一点或更换浏览器");
    }

}
