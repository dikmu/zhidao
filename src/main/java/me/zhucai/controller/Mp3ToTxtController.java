package me.zhucai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Mp3ToTxtController {

    @GetMapping("Mp3ToTxt/")
    public String run(){
        //get All mp3 files
        //
        return "ok";
    }

}
