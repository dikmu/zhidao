/**
 * 图书全文模糊搜索
 * @author muhongdi@qq.com
 */
var templateStr = $("#template")[0].innerHTML;

var cache = {
    title: null,
    content: null,
    size: 10,
    from: 0,
    took: 0,//time
    total: 0,//结果总数量
    max_score: 0,
    load_count: 0
};

// var searchParam = {
//     "size": cache.size,
//     "from": cache.from,
//     "highlight": {"fields": {"Content": {}}},
//     "_source": {
//         "exclude": ["Content"]
//     },
//     "query": {
//         "bool": {
//             "must": []
//         }
//     }
// };

$("#search-btn").on("click", searchFn);
$("#more-btn").on("click", loadMoreFn);

function searchFn() {
    var title = $("#search_title_in").val().trim();
    var content = $("#search_content_in").val().trim();
    cache.title = title;
    cache.content = content;
    searchByKeyWord();
}

$("#search_title_in").on('keyup', updateSearchBtnStatus);
$("#search_content_in").on('keyup', updateSearchBtnStatus);

function updateSearchBtnStatus() {
    var title = $("#search_title_in").val();
    var content = $("#search_content_in").val();
    if ((title == null || title.trim() == "") && (content == null || content.trim() == "")) {
        $("#search-btn").attr("disabled", true);
        $("#search-btn").addClass("disabled");
    } else {
        $("#search-btn").attr("disabled", false);
        $("#search-btn").removeClass("disabled");
    }
}

function searchByKeyWord() {

    $('#search-result')[0].innerHTML = "";
    $('#search-status').addClass("hiddenElement");
    $('#search-status1').addClass("hiddenElement");
    $("#hot-search-container").addClass("hiddenElement");
    $("#search-result-container").removeClass("hiddenElement");
    $("#more-btn").addClass("hiddenElement");
    //loading效果
    var txt = "搜索中..";
    $('#search-loading')[0].innerHTML = txt;
    var interval = setInterval(function () {
        txt = txt + ".";
        $('#search-loading')[0].innerHTML = txt;
    }, 1000);

    //发请求
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/rest/book/es/search",
        data: JSON.stringify({
            title: cache.title,
            text: cache.content,
            from: cache.from
        }),
        dataType: "json",
        success: function (result, status) {
            $('#search-loading')[0].innerHTML = "";
            cache.took = result.took;
            cache.total = result.hits.total;
            cache.max_score = result.hits.max_score;
            //读取写入数据到表格
            var books = result.hits.hits;
            $.each(books, function (index, book) {
                renderBook(book);
            });
            // $("#more-btn").removeClass("hiddenElement");
            updateMoreBtn();
            updateSearchStatus();
            updateEvent();
            clearInterval(interval);
            $('#search-loading')[0].innerHTML = "";
        },
        error: function (result, status, c) {

            $("#modal-tips")[0].innerHTML = result.responseText;
            document.getElementById("modal-button").click();
            if (result.responseText.indexOf("非VIP") != -1) {//超过非VIP账号每日可查询次数（10次）...
                //非VIP
                $("#suggest-upgrade-vip").removeClass("hiddenElement");
            } else {
                //VIP
                $("#suggest-upgrade-vip").addClass("hiddenElement");
            }
            clearInterval(interval);
            $('#search-loading')[0].innerHTML = "";
        }
    });
}

function loadMoreFn() {
    cache.from = cache.load_count;

    //loading效果
    var txt = "搜索中..";
    $('#search-loading')[0].innerHTML = txt;
    var interval = setInterval(function () {
        txt = txt + ".";
        $('#search-loading')[0].innerHTML = txt;
    }, 1000);

    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/rest/book/es/search",
        data: JSON.stringify({
            title: cache.title,
            text: cache.content,
            from: cache.load_count
        }),
        dataType: "json",
        success: function (result, status) {
            cache.took = result.took;//响应时间
            //读取写入数据到表格
            var books = result.hits.hits;
            $.each(books, function (index, book) {
                renderBook(book);
            });
            updateMoreBtn();
            updateSearchStatus();
            updateEvent();
            clearInterval(interval);
            $('#search-loading')[0].innerHTML = "";
        },
        error: function () {
            clearInterval(interval);
            $('#search-loading')[0].innerHTML = "";
        }
    });
}

function renderBook(book) {
    var html = templateStr.replace("$_id", book._id).replace("$BookName", book._source.Title).replace("$DownloadBook", "/rest/downloadBook/" + book._id);
    if (!book.highlight) {//部分查询没有highlight
        html = html.replace("$highlights", "");
    } else {
        var hs = book.highlight.Content;
        var hStr = '';
        for (var i = 0; i < hs.length; i++) {
            hStr += "<div class='resultLine toAddEvt'><span>" + (i + 1) + ".</span><span>" + hs[i].replace(/\r/g, "\n") + "</span></div>";
        }
        html = html.replace("$highlights", hStr);
    }
    $('#search-result').append(html);
    cache.load_count++;
}

function transferLineTxt(t) {
    //处理em
    t = t.replace(/<em>/g, '').replace(/<\/em>/g, '');
    // t = t.replace(/\r/g, "$r");
    // t = t.replace(/\n/g, "$n");
    return t;
}

function updateMoreBtn() {
    if (cache.load_count < cache.total) {
        $('#more-btn').removeClass("hiddenElement");
    } else {
        $('#more-btn').addClass("hiddenElement");
    }
}

function updateEvent() {
    var es = $(".toAddEvt");
    es.on("click", showBookDetail);
    es.removeClass("toAddEvt");
}

function updateSearchStatus() {
    $('#search-status').removeClass("hiddenElement");
    $("#time_used")[0].innerHTML = cache.took;
    $("#result_count")[0].innerHTML = cache.total;
    $("#search-result-container").removeClass("hiddenElement");
    //
    $('#search-status1').removeClass("hiddenElement");
    $("#time_used1")[0].innerHTML = cache.took;
    $("#result_count1")[0].innerHTML = cache.total;
    $("#search-result-container1").removeClass("hiddenElement");
}

function showBookDetail(e) {
    //获取resultLine
    var resultLineEm = $(e.target);
    //校准
    while (!resultLineEm.hasClass("resultLine")) {
        resultLineEm = resultLineEm.parent();
    }
    var text = resultLineEm.children()[1].innerHTML;
    //获取id
    var lastChild = resultLineEm.parent().children()[resultLineEm.parent().children().length - 2];
    var id = lastChild.innerHTML;
    text = transferLineTxt(text);
    //
    var queryJson = {
        text: text
    };

    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/rest/book/detail/" + id,
        data: JSON.stringify(queryJson),
        success: function (result, status) {
            $("#viewDetail")[0].innerHTML = result;
            showDetailView();
        }
    });
}

function showDetailView() {
    cache.EsViewScroll = document.documentElement.scrollTop;
    $('#view-detail-container').removeClass("hiddenElement");
    $('#search-result-container').addClass("hiddenElement");
    $('#search-input-container').addClass("hiddenElement");
    document.documentElement.scrollTop = 0;
}


function showEsSearch() {
    $('#view-detail-container').addClass("hiddenElement");
    $('#search-result-container').removeClass("hiddenElement");
    $('#search-input-container').removeClass("hiddenElement");
    document.documentElement.scrollTop = cache.EsViewScroll || 0;
}

function preventTimeout() {
    setInterval(function () {
        $.ajax({
            type: "get",
            contentType: "application/json",
            url: "/system/preventTimeout"
        });
    }, 600000)//10min
}

function init() {

    //设置默认值
    setTimeout(function () {
        $('#search_content_in')[0].value = "传奇";
        $('#search-btn')[0].disabled = false;
    }, 20)

    //设置热搜
    setTimeout(function () {
        $.ajax({
            type: "get",
            contentType: "application/json",
            url: "/rest/book/es/hot",
            success: function (result, status) {
                //set user recent search txt
                var urss = result[1];//userRecentSearch
                var html = "";
                for (var i = 0; i < urss.length; i++) {
                    var urs = eval("(" + urss[i] + ")");
                    if (urs.t != null && urs.t.trim() != "") {
                        html += "<button type=\"button\" class=\"btn btn-success btn-xs\">" + urs.t + "</button>"
                    }
                    if (urs.c != null && urs.c.trim() != "") {
                        html += "<button type=\"button\" class=\"btn btn-info btn-xs\">" + urs.c + "</button>"
                    }
                }
                $("#user-recent-search")[0].innerHTML = html;
                //
                urss = result[2];//userRecentSearch
                html = "";
                for (var i = 0; i < urss.length; i++) {
                    var urs = urss[i];
                    if (urs != null && urs.trim() != "") {
                        html += "<button type=\"button\" class=\"btn btn-default btn-xs\">" + urs + "</button>"
                    }
                }
                $("#hot-search")[0].innerHTML = html;
                //
                $("#user-recent-search button").on("click", function (e) {
                    var txt = e.target;
                    e = $(txt);
                    if (e.hasClass('btn-success')) {
                        $('#search_title_in').val(e[0].innerText);
                        $('#search_content_in').val("");
                    } else if (e.hasClass('btn-info')) {
                        $('#search_title_in').val("");
                        $('#search_content_in').val(e[0].innerText);
                    }
                })
                $("#hot-search button").on("click", function (e) {
                    var txt = e.target;
                    e = $(txt);
                    $('#search_content_in').val(e[0].innerText);
                    $('#search_title_in').val("");
                })
            }


        });
    }, 1)

    preventTimeout();
}

init();



