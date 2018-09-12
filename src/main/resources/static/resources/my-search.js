var templateStr = $("#template")[0].innerHTML;
var orgResultContent = $("#results-content")[0].innerHTML;

var tim = null;
var lastSearchKeyword;
var totalSize = 0;//当前页面总条数
var pageSize = 10;//每次加载条数

$("#miv").on("keyup", function (txt) {
    if (tim != null) {
        clearTimeout(tim);
    }
    if ($("#miv").val() != null && $("#miv").val().trim() != "") {
        tim = setTimeout(function () {
            var txt = $("#miv").val();
            searchByKeyWord(txt);
        }, 500);
    }
})

function setBtnListener() {
    // $(".showMore").on('click',function(e){
    //     var id = $(this).parent().parent().children()[0].innerHTML;
    //     console.log(id);
    //     $.ajax({
    //         type: "post",
    //         contentType: "application/json",
    //         url: "http://127.0.0.1:9200/store/epub/_search",
    //         data: '{"size":10,"from":0,"_source":{"include":["Title","Authors"]},"query":{"query_string":{"query":"'+txt+'"}},"highlight":{"fields":{"Content":{}}}}',
    //         dataType: "json",
    //         success: function (result,status) {
    //             //读取写入数据到表格
    //             var books = result.hits.hits;
    //             $.each(books, function (index, book) {
    //                 var html = templateStr.replace("$_id",book._id).replace("$BookName",book._source.Title).replace("$_score",book._score);
    //                 var hs = book.highlight.Content;
    //                 var hStr='';
    //                 for(var i=0;i<hs.length;i++){
    //                     hStr+="<a>"+hs[i]+"</a>";
    //                     if(i<hs.length-1){
    //                         hStr=hStr+"<br>";
    //                     }
    //                 }
    //                 html = html.replace("$highlights",hStr);
    //                 console.log(html);
    //                 $('#results-content').append(html);
    //             });
    //             //添加监听
    //             setBtnListener();
    //         }
    //     });
    // })
}

function transferURI(t) {
    while (t.indexOf('</em>') != -1) {
        t = t.replace('</em>', '');
    }
    t = t.replace(/<em>/g, "");
    return escape(t);
}


function searchByKeyWord(txt) {
    if (txt != null && txt.trim() != "") {
        // console.log(templateStr);
        // $("#template")[0].innerHTML=templateStr;
        lastSearchKeyword = txt;
        totalSize = 0;
        $("#results-content")[0].innerHTML="";
        $('.pager')[0].style.display='none'
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: "http://127.0.0.1:9200/store/epub/_search",
            data: '{"size":' + pageSize + ',"from":' + totalSize + ',"_source":{"include":["Title","Authors"]},"query":{"query_string":{"query":"' + txt + '"}},"highlight":{"fields":{"Content":{}}}}',
            dataType: "json",
            success: function (result, status) {
                //读取写入数据到表格
                var books = result.hits.hits;
                $.each(books, function (index, book) {
                    var html = templateStr.replace("$_id", book._id).replace("$BookName", book._source.Title).replace("$_score", book._score);
                    var hs = book.highlight.Content;
                    var hStr = '';
                    for (var i = 0; i < hs.length; i++) {
                        hStr += (i + 1) + "." + "<a href='./detail.html?id=" + book._id + "&&search=" + transferURI(hs[i]) + "'>" + hs[i] + "</a>";
                        if (i < hs.length - 1) {
                            hStr = hStr + "<br>";
                        }
                    }
                    html = html.replace("$highlights", hStr);
                    $('#results-content').append(html);
                    totalSize++;
                });
                //添加监听
                // setBtnListener();
                $(".pager")[0].style.display = 'inline-block';
            }
        });

    }
}


function showMore() {
    txt = lastSearchKeyword;
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://127.0.0.1:9200/store/epub/_search",
        data: '{"size":' + pageSize + ',"from":' + totalSize + ',"_source":{"include":["Title","Authors"]},"query":{"query_string":{"query":"' + txt + '"}},"highlight":{"fields":{"Content":{}}}}',
        dataType: "json",
        success: function (result, status) {
            //读取写入数据到表格
            var books = result.hits.hits;
            $.each(books, function (index, book) {
                var html = templateStr.replace("$_id", book._id).replace("$BookName", book._source.Title).replace("$_score", book._score);
                var hs = book.highlight.Content;
                var hStr = '';
                for (var i = 0; i < hs.length; i++) {
                    hStr += (i + 1) + "." + "<a href='./detail.html?id=" + book._id + "&&search=" + transferURI(hs[i]) + "'>" + hs[i] + "</a>";
                    if (i < hs.length - 1) {
                        hStr = hStr + "<br>";
                    }
                }
                html = html.replace("$highlights", hStr);
                $('#results-content').append(html);
                totalSize++;
            });
            //添加监听
            setBtnListener();
        }
    });
}
