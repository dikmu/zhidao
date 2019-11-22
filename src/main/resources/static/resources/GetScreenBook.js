var array = [];
var data;

function send(arr) {
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:8081/epubee/screenShot",
        data: JSON.stringify(arr),
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

var extededStr=['[.azw3]','[.azw]','[.mobi]','[.epub]','[.prc]'];
function removeExtend(name){
    for(var i=0;i<extededStr.length;i++){
        name = name.replace(extededStr[i],'');
    }
    return name.trim();
}


function getBooks(){
    $.ajax({
        type: "post",
        contentType: "application/json; charset=utf-8",
        url: "http://cn.epubee.com/keys/get_ebook_list.asmx/getList",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (json) {
            data = json.d;
            for (var i = 0; i < data.length; i++) {
                array.push(removeExtend(data[i].Title));
            }
            send(array);
        },
        error: function (err) {
            console.log(err);
        }
    });
}
getBooks();

setInterval(function () {
    getBooks();
},300000);


