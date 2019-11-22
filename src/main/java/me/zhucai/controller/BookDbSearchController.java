package me.zhucai.controller;

import com.alibaba.fastjson.JSONArray;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/rest")
public class BookDbSearchController {

    @GetMapping("/search/db/{text}")
    public JSONArray searchBook(HttpServletRequest request, @PathVariable("text") String text, @Nullable @RequestParam("from") Integer from){
        return null;
    }

}
