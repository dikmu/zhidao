function search1() {
    var value = document.getElementById("_in").value;
    window.open("https://www.zhihu.com/search?q=" + value + "&type=content", "_blank");//知乎
    window.open("https://search.smzdm.com/?c=home&s=" + value, "_blank");//什么值得买
}

//
function search2() {
    var value = document.getElementById("_in").value;
    window.open("http://you.163.com/search?keyword=" + value, "_blank");
    window.open("https://youpin.mi.com/search?keyword=" + value, "_blank");
    window.open("https://www.muji.com.cn/cn/store/search?qtext=" + value, "_blank");//无印良品
    window.open("http://s.vancl.com/search?k=" + value + "&orig=3", "_blank");//凡客
    window.open("http://search.jumei.com/?filter=0-11-1&search=" + value + "&from=&cat=", "_blank");
    window.open("https://www.kaola.com/search.html?zn=top&key=" + value, "_blank");// 网易考拉
    window.open("http://category.vip.com/suggest.php?keyword=" + value, "_blank");// 唯品会
    window.open("https://www.xiaohongshu.com/search_result/" + value, "_blank");// 小红书
}

function search3() {
    var value = document.getElementById("_in").value;
    window.open("https://search.jd.com/Search?keyword=" + value + "&enc=utf-8", "_blank");//京东
    window.open("http://list.tmall.com/search_product.htm?q=" + value + "&type=p&from=..pc_1_opensearch", "_blank");//天猫
    window.open("https://s.taobao.com/search?q=" + value + "&type=p&from=..pc_1_opensearch", "_blank");//淘宝
    window.open("https://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=亚马逊网站&url=search-alias%3Daps&field-keywords=" + value, "_blank");//亚马逊
    window.open("http://search.dangdang.com/?key=" + value + "&act=input", "_blank");//当当
    window.open("http://mobile.yangkeduo.com/search_result.html?search_key=" + value , "_blank");//拼多多

}

function search4() {
    var value = document.getElementById("_in").value;
    window.open("https://search.suning.com/" + value + "/", "_blank");
    window.open("https://search.gome.com.cn/search?question=" + value + "&searchType=goods", "_blank");//国美
    window.open("http://www.carrefour.cn/category?s=" + value, "_blank");
    window.open("http://search.yhd.com/c0-0/k" + value + "/", "_blank");//1号店
    window.open("https://www.ikea.cn/cn/zh/search/?query=" + value, "_blank");//宜家
}

function search5() {
    var value = document.getElementById("_in").value;
    window.open("http://sy.meituan.com/s/" + value + "/", "_blank");//美团
    window.open("https://sy.nuomi.com/search?k=" + value, "_blank");//糯米

}

function search6() {
    var value = document.getElementById("_in").value;
    window.open("https://www.vmall.com/search?keyword=" + value, "_blank");//华为
    window.open("https://www.apple.com/cn/search/" + value + "?src=globalnav", "_blank");//苹果
    window.open("http://www.tcl.com/search/search?keyword=" + value + "&sortBy=sortWeight", "_blank");//TCL
    window.open("https://www.midea.cn/search?keyword=" + value, "_blank");//美的
    window.open("http://mall.gree.com/mall/SearchDisplay?categoryId=&storeId=11171&catalogId=10001&langId=-7&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=grid&beginIndex=0&pageSize=24&searchTerm=" + value, "_blank");//格力
    window.open("http://www.haier.com/was5/web/search?channelid=249897&searchword=" + value, "_blank");//海尔
    window.open("https://www.hisense.com/search?q=" + value, "_blank");//海信
}

//未搞定：
//https://ju.taobao.com/search.htm?words=%D4%A1%BD%ED