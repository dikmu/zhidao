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
        SysMenu menu1 = new SysMenu("电子书搜索");
        menu1.getChildren().add(new SysMenu("全文模糊搜索", PageDirectController.PAGE_ID_BOOK_ES_SEARCH));
        if (SecurityUtils.getSubject() != null && SecurityUtils.getSubject().hasRole("admin")) {
            menu1.getChildren().add(new SysMenu("全文精确搜索", PageDirectController.PAGE_ID_BOOK_DB_SEARCH));
        }
        list.add(menu1);
        //
        if (SecurityUtils.getSubject() != null && SecurityUtils.getSubject().hasRole("admin")) {
            SysMenu menu2 = new SysMenu("资料搜索");
            menu2.getChildren().add(new SysMenu("各大平台课程搜索", PageDirectController.PAGE_ID_CLASS_SEARCH));
            menu2.getChildren().add(new SysMenu("各硬盘资料搜索", PageDirectController.PAGE_ID_DISK_FILE_SEARCH));
            list.add(menu2);
        }
        SysMenu menu3 = new SysMenu("购物神器");
        menu3.getChildren().add(new SysMenu("电子书搜索", PageDirectController.PAGE_ID_BOOK_ES_SEARCH));
        menu3.getChildren().add(new SysMenu("购物比价神器", PageDirectController.PAGE_ID_BUY_THINGS_SEARCH));
        list.add(menu3);
        return list;
    }


}
