//java -jar E:\ws_github\zhidao\target\zhidao-0.0.1-SNAPSHOT.jar

var arr=[
//------plus-------------
    "fintech",
    "意林",
    "金匮要略",
    "LOVE文庫",
    "左眼看细节",
    "右眼看全局",
    "在世界中心流浪"
];

var muindex=0;

function nextFn(){
    if(arr.length == (muindex+1)){
        alert('没数据了');
    }
    $('#s_key').val(arr[muindex]);
    muindex++;
    document.getElementById('s_post').click();
    marked=false;
    tryMark();
}

$('.searchKey').append("<a id='nextBtn' onclick=nextFn() style='margin-left:20px'>next next</a>");
$('.searchKey').append("<a id='tryMark' onclick=markAllDownloadedBook() style='margin-left:20px'>markAllDownloadedBook</a>");
$('#s_key')[0].style.width='500px';
$('body').bind('keyup',function(e){if(e.keyCode==90){document.getElementById('nextBtn').click();}})

//只有当界面上有书籍时，才执行标记
var marked=false;
function tryMark(){
    if(!marked){
        if($('.list_title a').length>0){
            markAllDownloadedBook();
            marked=true;
        }else{
            setTimeout(tryMark,1000);
        }
    }
}

function markAllDownloadedBook() {
    var count=0;
    $('#tryMark')[0].innerHTML="markAllDownloadedBook";
    var eis = $('.list_title a');
    var req_str="";
    for(var i = 0 ;i<eis.length;i++){
        req_str=req_str+eis[i].innerHTML;//不含扩展名的book title
        if(i<eis.length-1){
            req_str=req_str+":::";
        }
    }


    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "http://localhost:8081/epubee/receive",
        data: req_str,
        dataType: "json",
        success: function (result) {
            var selecteds = result.selected;
            console.log(selecteds);
            for(var i=0;i<selecteds.length;i++){
                for(var j = 0 ;j<eis.length;j++){
                    //console.log(selecteds[i]+"  ---  "+eis[j].innerHTML);
                    if( selecteds[i] == eis[j].innerHTML){
                        //console.log("--------------")
                        eis[j].innerHTML=eis[j].innerHTML+"——已下载";
                        $(eis[j]).parent().parent().children()[2].remove();
                        $($(eis[j]).parent().parent().children()[1]).css("color","red");
                        count++;
                    }
                }
            }

            $('#tryMark')[0].innerHTML="markAllDownloadedBook("+ count +")";
        }
    });

}


