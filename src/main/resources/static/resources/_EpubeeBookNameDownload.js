/**
 * epubee默认页面数据定期发送到后台
 */
var totalSend = 0;

function sendBooks() {
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:8080/epubee/receive2",
        data: getAllBooks().toString(),
        dataType: "json",
        success: function (result) {
            console.log(totalSend++);
        }
    });
}

function getAllBooks() {
    var arr = [];
    var eis = $('.list_title a');
    for (var i = 0; i < eis.length; i++) {
        arr.push(eis[i].innerHTML);//不含扩展名的book title
    }
    return arr;
}

var time = 120;//每隔120s推送
setInterval(function () {
    time--;
    if (time != 0) {
        document.getElementById('left').innerHTML = time + '秒后推送数据到后台';
    } else {
        time = 120;
        sendBooks();
        //
        document.getElementById('left').innerHTML = "Sending " + totalSend + "次";
    }
}, 1000);//每隔1秒钟刷新时钟