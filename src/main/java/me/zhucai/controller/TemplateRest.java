package me.zhucai.controller;

import com.alibaba.fastjson.JSONObject;
import me.zhucai.bean.Template;
import me.zhucai.mapper.TemplateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TemplateRest {

    @Autowired
    public TemplateMapper templateMapper;

    @PostMapping("/template")
    public String test(@RequestBody JSONObject jsonObject) {
        System.out.println("---------test create------------");
        System.out.println(jsonObject);
        Template t = new Template();
        t.setUid(jsonObject.getString("Uid"));
        t.setName(jsonObject.getString("Name"));
        return "" + templateMapper.insert(t);
    }

}
