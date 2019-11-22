var Epubee = function () {

    /**
     * 获取当前页面上所有书名
     * @returns {Array}
     */
    this.getAllTitles = function () {
        var titles = [];
        var ts = $('.list_title a');
        for (var i = 0; i < ts.length; i++) {
            titles.push(ts[i].innerText.trim());
        }
        return titles;
    }

    /**
     * 获取当前页面上所有封装后的电子书对象
     * showDownloaded:true：显示已下载项目
     *                false：不显示已下载项目
     * @returns {Array}
     */
    this.getAllEBookItems = function (showDownloaded) {
        var showDownloaded = showDownloaded || false;
        var allEbookItems = [];
        var ebookList = $('.get_ebook_list')[0].children;
        for (var i = 0; i < ebookList.length; i++) {
            var title = $('.list_title a')[i].innerText;
            var obj = {title: title, isDownloaded: false};
            if (title.indexOf('——已下载') > 0) {
                obj.isDownloaded = true;
            } else {
                obj.isDownloaded = false;
            }
            if (!showDownloaded && !obj.isDownloaded) {
                var downloaded = $('.list_download a')[i].innerText;
                var extend = $('.list_title')[i].innerText.split(' ')[1].replace('[', '').replace(']', '');
                obj.downloaded = downloaded;
                obj.extend = extend;
                allEbookItems.push(obj);
            } else {
                //un implemented
                console.log("un implemented");
            }
        }
        return allEbookItems;
    }

    /**
     * 开始自动下载50本
     */
    this.start = function (num) {
        var num = num || 50;
        //1.标记已有电子书

    }

}

function AutoDownPage() {

    var downloadCount = 0;
    var neededDownloadCount = 50;

    this.downCurrentPage = function () {

    }

    this.start = function () {
        inter = setInterval(function () {
            if (goon) {
                if (i % 2 == 0) {
                    goon = false;
                    if (0 == all(".azw3")) {
                        if (0 == all(".azw")) {
                            if (0 == all(".mobi")) {
                                if (0 == all(".epub")) {
                                }
                            }
                        }
                    }
                } else {
                    nextFn();
                }
                i++;
            }
        }, 5000)
    }

    this.stop = function () {
        clearInterval(inter);
    }

    function all(extend) {
        var extend = extend || '.azw3';
        var as0 = $('.list_download a');
        var as = [];
        for (var i = 0; i < as0.length; i++) {
            if (as0[i].classList[0] != 'added') {
                if (as0[i].parentElement.parentElement.innerText.indexOf(extend) > -1) {
                    as.push(as0[i]);
                }
            }
        }
        if (as.length == 0) {
            console.log("找不到" + extend);
            return 0;
        }
        var i = 0;
        //立即下载
        as[i].click();
        i++;
        //延迟10秒
        var inter = setInterval(function () {
            as[i].click();
            i++;
            if (i >= as.length) {
                clearInterval(inter);
                goon = true;
                console.log("over all");
            }
        }, 10000)
    }

}

var AutoDownPage = new AutoDownPage();
AutoDownPage.start();