var notFount=[];
function allExtend() {
    if (0 == all(".azw3")) {
        if (0 == all(".azw")) {
            if (0 == all(".epub")) {
                if (0 == all(".mobi")) {
                    notFount.push($('#s_key')[0].value);
                    console.log("搜索不到扩展名");
                    doing = false;
                    allDownloaded=true;
                }
            }
        }
    }
}

function hasError(){
	var as0 = $('.list_download a');
    for (var i = 0; i < as0.length; i++) {
		var txt=as0[i].innerText;
		if(txt == null){
			continue;
		}else{
			txt=txt.trim();
			if(txt=='多于 50项每天'||txt=='太快被限'){
				return true;
			}
		}
	}
	return false;
}

//下载azw3
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
    //延迟10秒
    doing = true;
    var inter = setInterval(function () {
		if(hasError()){
			console.log("stop interval");
			return;
		}
        as[i].click();
        curDown++;
        i++;
        if (i >= as.length) {
            clearInterval(inter);
            console.log("over all");
            doing = false;
            allDownloaded=true;
        }
    }, 10000)
}

var wantCount = 50;
var curDown = 0;
var doing = false;
var allDownloaded=false;
setInterval(function () {
    // if (curDown == wantCount) {//超出预期下载量
    //     alert("超出预期下载量");
    //     return;
    // }
    // if (curDown > wantCount) {//超出预期下载量
    //     return;
    // }
    if(doing){
        return;
    }
    if(allDownloaded){
        nextFn();
        allDownloaded=false;
        return;
    }
    allExtend();
}, 10000);
//next 到新页面后开始执行