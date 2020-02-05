package me.zhucai.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/system")
public class SystemController {

    @GetMapping("/preventTimeout")
    public ResponseEntity preventTimeout() {
        return ResponseEntity.ok().contentType(MediaType.TEXT_PLAIN).body("");
    }

}
