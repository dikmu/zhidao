function markAllDownloadedBook() {
    var count=0;
    $('#tryMark')[0].innerHTML="tryMark";
    var arr=[];
    var eis = $('.list_title a');
    for(var i = 0 ;i<eis.length;i++){
        arr.push(eis[i].innerHTML);//不含扩展名的book title
    }

    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:8080/epubee/receive",
        data: arr.toString(),
        dataType: "json",
        success: function (result) {
            var selecteds = result.selected;
            for(var i=0;i<selecteds.length;i++){
                for(var j = 0 ;j<eis.length;j++){
                    if( selecteds[i] == eis[j].innerHTML){
                        eis[j].innerHTML=eis[j].innerHTML+"——已下载";
                        $(eis[j]).parent().parent().children()[2].remove();
                        count++;
                    }
                }
            }
        }
    });
    $('#tryMark')[0].innerHTML=$('#tryMark')[0].innerHTML+"("+ count +")";
}

markAllDownloadedBook();