//java -jar E:\ws_github\zhidao\target\zhidao-0.0.1-SNAPSHOT.jar

var arr=[
    "地理的故事",
    "视觉锤",
    "以色列",
    "重塑大脑",
    "哥德尔艾舍尔巴赫集异璧之大成 ",
    "斯坦福的高效睡眠法 ",
    "自慢：从员工到总经理的成长笔记",
    "即兴判断",
    "中国企业最常用的组织战略管理工具",
    "癫狂的医学",
    "工作现场优选守则",
    "哲学的盛宴",
    "赵绍琴医学全集",
    "神秘岛",
    "何谓文化",
    "市场营销部规范化管理工具箱",
    "无敌",
    "舰队",
    "计量",
    "成熟",
    "隋唐佛教史",
    "晚清七十年",
    "世界与你无关",
    "高兴死了",
    "第3选择",
    "统治阶级",
    "阿加莎•克里斯蒂自传 ",
    "巴菲特之道",
    "存储",
    "作证",
    "汉字",
    "传媒殖民政治",
    "名利场",
    "演讲",
    "财富的本质",
    "峰会：影响20 世纪的六场元首会谈 ",
    "舒服",
    "你的英文简历够帅吗",
    "no",
//-------no----------
    "赢过巴菲特",
    "的艺术",
    "梦想与沉浮",
    "大交易",
    "私人银行",
    "电子，电子",
    "机械电子学",
    "前瞻设计",
    "非线性规划",
    "安防天下2",
    "Hadoop权威指南",
    "教堂建筑的秘密语言",
    "Uber中国创业史",
    "西医的故事",
    "万物运转的秘密",
    "谁说商业直觉是天生的",
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


