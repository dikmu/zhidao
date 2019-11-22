package me.zhucai.bean;

import lombok.*;

@Data
@AllArgsConstructor
@Setter
@Getter
public class AllStudyDoc {
    String uuid;
    String filename;
    String filepath;
    String content;
    String info;

}
