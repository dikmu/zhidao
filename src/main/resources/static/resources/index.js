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

var searchParam = {
    "size": cache.size,
    "from": cache.from,
    "highlight": {"fields": {"Content": {}}},
    "_source": {
        "exclude": ["Content"]
    },
    "query": {
        "bool": {
            "must": []
        }
    }
};

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
    var title = cache.title;
    var content = cache.content;

    searchParam = {
        "size": cache.size,
        "from": cache.from,
        "highlight": {"fields": {"Content": {}}},
        "_source": {
            "exclude": ["Content"]
        },
        "query": {
            "bool": {
                "must": []
            }
        }
    };

    if (title != null && title != "") {
        searchParam.query.bool.must.push({"match": {"Title": title}});
    }
    if (content != null && content != "") {
        searchParam.query.bool.must.push({"match": {"Content": content}});
    }

    $('#search-result')[0].innerHTML = "loading...";

    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:9200/store/epub/_search",
        data: JSON.stringify(searchParam),
        dataType: "json",
        success: function (result, status) {
            $('#search-result')[0].innerHTML = "";
            cache.took = result.took;
            cache.total = result.hits.total;
            cache.max_score = result.hits.max_score;
            //读取写入数据到表格
            var books = result.hits.hits;
            $.each(books, function (index, book) {
                renderBook(book);
            });
            updateMoreBtn();
            updateSearchStatus();
        }
    });
}

function loadMoreFn() {
    cache.from = cache.load_count;
    searchParam.from = cache.load_count;
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:9200/store/epub/_search",
        data: JSON.stringify(searchParam),
        dataType: "json",
        success: function (result, status) {
            cache.took = result.took;
            //读取写入数据到表格
            var books = result.hits.hits;
            $.each(books, function (index, book) {
                renderBook(book);
            });
            updateMoreBtn();
            updateSearchStatus();
        }
    });
}

function renderBook(book) {
    var html = templateStr.replace("$_id", book._id).replace("$BookName", book._source.Title).replace("$_score", book._score);
    if (!book.highlight) {//部分查询没有highlight
        html = html.replace("$highlights", "");
    } else {
        var hs = book.highlight.Content;
        var hStr = '';
        for (var i = 0; i < hs.length; i++) {
            hStr += (i + 1) + "." + "<a href='./detail.html?id=" + book._id + "&&search=" + transferURI(hs[i]) + "'>" + hs[i] + "</a>";
            if (i < hs.length - 1) {
                hStr = hStr + "<br>";
            }
        }
        html = html.replace("$highlights", hStr);
    }
    $('#search-result').append(html);
    cache.load_count++;
}

function transferURI(t) {
    while (t.indexOf('</em>') != -1) {
        t = t.replace('</em>', '');
    }
    t = t.replace(/<em>/g, "");
    return escape(t);
}

function updateMoreBtn() {
    if (cache.load_count < cache.total) {
        $('#more-btn').css('display', 'block');
    } else {
        $('#more-btn').css('display', 'none');
    }
}

function updateSearchStatus(){
    $('#search-status').css('display', 'block');
    $("#time_used")[0].innerHTML=cache.took;
    $("#result_count")[0].innerHTML=cache.total;
}
