package me.zhucai.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class SysMenu {
    //    private String id;
    private String name;
    private String link;
    private List<SysMenu> children;
    private boolean dir;
    private String icon;
    private String target;

    public SysMenu(String name) {
        this.name = name;
        this.dir = true;
        children = new ArrayList<>();
    }

    public SysMenu(String name, String link, String icon) {
        this.name = name;
        this.link = link;
        this.icon = icon;
        this.dir = false;
    }

//    public SysMenu(String name, String link, String target) {
//        this.name = name;
//        this.link = link;
//        this.dir = false;
//        this.target = target;
//    }

}
