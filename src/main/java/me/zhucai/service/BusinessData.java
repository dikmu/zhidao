package me.zhucai.service;

import me.zhucai.bean.SysMenu;
import me.zhucai.controller.PageDirectController;
import org.apache.shiro.SecurityUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 模拟数据库查询
 */
public class BusinessData {

    public static List<SysMenu> getSysMenus() {
        List<SysMenu> list = new ArrayList<>();
//        SysMenu menu1 = new SysMenu("电子书搜索", PageDirectController.PAGE_ID_BOOK_ES_SEARCH);
//        menu1.getChildren().add(new SysMenu("全文模糊搜索", PageDirectController.PAGE_ID_BOOK_ES_SEARCH));
//        if (SecurityUtils.getSubject() != null && SecurityUtils.getSubject().hasRole("admin")) {
//            menu1.getChildren().add(new SysMenu("全文精确搜索", PageDirectController.PAGE_ID_BOOK_DB_SEARCH));
//        }
        list.add(new SysMenu("电子书搜索", "/pages/" + PageDirectController.PAGE_ID_BOOK_ES_SEARCH));
        list.add(new SysMenu("购物比价神器", "/pages/" + PageDirectController.PAGE_ID_BUY_THINGS_SEARCH));
        //
        if (SecurityUtils.getSubject() != null && SecurityUtils.getSubject().hasRole("admin")) {
            list.add(new SysMenu("各大平台课程搜索", "/pages/" + PageDirectController.PAGE_ID_CLASS_SEARCH));
            list.add(new SysMenu("各硬盘资料搜索", "/pages/" + PageDirectController.PAGE_ID_DISK_FILE_SEARCH));
        }
        return list;
    }


}
