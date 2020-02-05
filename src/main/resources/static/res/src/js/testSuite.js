/**
 *  by muhongdi
 *  2019年2月27日
 */

/**
 * 环境信息
 * @type {*[]}
 */
// var GlobalData = {
//     TestURL:{
//     },
//     ExceptionDatas: [
//         {id: "1", ip: "10.221.8.11", desc: "中台1", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "2", ip: "10.221.8.12", desc: "中台2", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "5", ip: "10.221.150.181", desc: "数据库", status: "在线", opt: "2", switch: "", type: 'db'},
//         {id: "6", ip: "8.18", desc: "模拟Search One", status: "在线", opt: "2", switch: "", type: 's1'},
//         {id: "7", ip: "8.20", desc: "ELK", status: "在线", opt: "3", switch: "", type: 'elk'},
//         {
//             id: "8",
//             ip: "10.221.169.227<br>10.221.169.228<br>10.221.169.229<br>10.221.8.11<br>10.221.8.12",
//             desc: "Redis",
//             status: "在线",
//             opt: "3",
//             switch: "",
//             type: 'redis'
//         }
//     ]
// }
//
// var GlobalData = {
//     ExceptionDatas: [
//         {id: "3", ip: "10.221.169.227", desc: "中台3", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "4", ip: "10.221.169.228", desc: "中台4", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "5", ip: "10.221.150.181", desc: "数据库", status: "在线", opt: "2", switch: "", type: 'db'},
//         {id: "6", ip: "8.18", desc: "模拟Search One", status: "在线", opt: "2", switch: "", type: 's1'},
//         {id: "7", ip: "8.20", desc: "ELK", status: "在线", opt: "3", switch: "", type: 'elk'},
//         {
//             id: "8",
//             ip: "10.221.169.227<br>10.221.169.228<br>10.221.169.229<br>10.221.8.11<br>10.221.8.12",
//             desc: "Redis",
//             status: "在线",
//             opt: "3",
//             switch: "",
//             type: 'redis'
//         }
//     ]
// }
//
// var GlobalData = {
//     ExceptionDatas: [
//         {id: "1", ip: "10.221.8.7", desc: "中台1", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "2", ip: "10.221.8.8", desc: "中台2", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "5", ip: "10.221.150.181", desc: "数据库", status: "在线", opt: "2", switch: "", type: 'db'},
//         {id: "6", ip: "8.18", desc: "模拟Search One", status: "在线", opt: "2", switch: "", type: 's1'},
//         {id: "7", ip: "8.20", desc: "ELK", status: "在线", opt: "3", switch: "", type: 'elk'},
//         {
//             id: "8",
//             ip: "10.221.169.227<br>10.221.169.228<br>10.221.169.229<br>10.221.8.11<br>10.221.8.12",
//             desc: "Redis",
//             status: "在线",
//             opt: "3",
//             switch: "",
//             type: 'redis'
//         }
//     ]
// }

// var GlobalData = {
//     ExceptionDatas: [
//         {id: "1", ip: "10.221.8.11", desc: "中台1", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "2", ip: "10.221.8.12", desc: "中台2", status: "在线", opt: "1", switch: "1", type: 'console'},
//         {id: "3", ip: "10.221.169.227", desc: "中台3", status: "离线", opt: "", switch: "", type: 'console'},
//         {id: "4", ip: "10.221.169.228", desc: "中台4", status: "离线", opt: "", switch: "", type: 'console'},
//         {id: "5", ip: "10.221.150.181", desc: "数据库", status: "在线", opt: "2", switch: "", type: 'db'},
//         {id: "6", ip: "8.18", desc: "模拟Search One", status: "在线", opt: "2", switch: "", type: 's1'},
//         {id: "7", ip: "8.20", desc: "ELK", status: "在线", opt: "3", switch: "", type: 'elk'},
//         {
//             id: "8",
//             ip: "10.221.169.227<br>10.221.169.228<br>10.221.169.229<br>10.221.8.11<br>10.221.8.12",
//             desc: "Redis",
//             status: "在线",
//             opt: "3",
//             switch: "",
//             type: 'redis'
//         }
//     ]
// }

/**
 * 基于模板，生成异常操作列表
 * @param data
 */
function appendExceptionDataTBody(data) {
    var tr =
        "<tr class=\"even pointer\" id='tr_" + data.id + "'>" +
        "    <td class=\"a-center \">" +
        /*"         <input type=\"checkbox\" class=\"flat\" name=\"table_records\">" +*/
        "    </td>" +
        "    <td class=\" \">$$ip</td>" +
        "    <td class=\" \">$$desc</td>" +
        "    <td class=\" \">$$status <i class=\"success fa\"></i>" +
        "    </td>" +
        "    <!--控制按钮-->" +
        "    <td class=\" \">" +
        "       $$td1" +
        "    </td>" +
        "    <td class=\" \">" +
        "       $$td2"
    "    </td>" +
    "</tr>";

    var td11 =
        "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch except-null\"/> 空指针" +
        "</label>" +
        "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch except-run\"/> 运行时" +
        "</label>" +
        "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch except-disk\" disabled /> 磁盘满" +
        "</label>";

    var td12 = "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch except-break\"/> 断开" +
        "</label>" +
        "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch except-lag\"/> 延迟" +
        "</label>";

    var td13 = "<label>" +
        "    <input type=\"checkbox\" class=\"js-switch  except-break\"/> 断开" +
        "</label>";

    var td2 = "<div class=\"btn-group\" data-toggle=\"buttons\">" +
        "    <label class=\"btn btn-default active\">" +
        "        <input type=\"radio\" name=\"options\" value=\"STANDARD\"> 正常" +
        "    </label>" +
        "    <label class=\"btn btn-default\">" +
        "        <input type=\"radio\" name=\"options\" value=\"MINIMAL\" >" +
        "        中台透传" +
        "    </label>" +
        "    <label class=\"btn btn-default\">" +
        "        <input type=\"radio\" name=\"options\"  value=\"DATALINK\">" +
        "        链路透传" +
        "    </label>" +
        "</div>";
    //
    tr = tr.replace("$$ip", data.ip).replace("$$desc", data.desc).replace("$$status", data.status);
    //
    if (data.opt == 1) {
        tr = tr.replace("$$td1", td11);
    } else if (data.opt == 2) {
        tr = tr.replace("$$td1", td12);
    } else if (data.opt == 3) {
        tr = tr.replace("$$td1", td13);
    } else if (data.opt == "") {
        tr = tr.replace("$$td1", "");
    }
    //
    if (data.switch == '1') {
        tr = tr.replace("$$td2", td2);
    } else if (data.switch == '') {
        tr = tr.replace("$$td2", "");
    }
    $("#ExceptionDataTBody").append(tr);
}

function executeExceptionOpt() {
    var param = [];
    //处理中台异常
    for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
        var exceptionData = GlobalData.ExceptionDatas[i];
        var e = $("#tr_" + exceptionData.id + " .except-null");
        var e1 = e[0] != null ? e[0].checked : "";
        if (e1) {
            param.push({
                mockType: "consoleJavaException",
                ServerIp: exceptionData.ip,
                mockParams: "java.lang.NullPointerException"
            })
        }
        e = $("#tr_" + exceptionData.id + " .except-run");
        var e2 = e[0] != null ? e[0].checked : "";
        if (e2) {
            param.push({
                mockType: "consoleJavaException",
                ServerIp: exceptionData.ip,
                mockParams: "java.lang.RuntimeException"
            })
        }

        //
        e = $("#tr_" + exceptionData.id + " .except-disk");
        var e3 = e[0] != null ? e[0].checked : "";
        if (e3) {
            //todo 磁盘满
        }
        e = $("#tr_" + exceptionData.id + " .except-lag");
        var e4 = e[0] != null ? e[0].checked : "";
        if (e4) {
            if (exceptionData.type == "s1") {
                param.push({
                    mockType: "S1_Lag",
                    mockParams: 10
                })
            } else if (exceptionData.type == "db") {
                param.push({
                    mockType: "DB_Lag",
                    mockParams: 10
                })
            }
        }


    }
    if (param.length == 0) {
        param = "";
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/runTest/ea76840ec9dc5b88110b/"+PageId,
        data: JSON.stringify({ea76840ec9dc5b88110b: param}),
        dataType: "text",
        success: function (result) {
            notify("执行成功", result, "success");
        },
        error: function (result) {
            notify("执行失败", result, "error");
        }
    });

}

var webLogId;

$(function () {

    //填充异常模拟数据
    for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
        var exceptionData = GlobalData.ExceptionDatas[i];
        appendExceptionDataTBody(exceptionData);
    }


    $("#executeTest").click(function () {
        var n = $("#number")[0].value;
        var t = $("#testTime")[0].value;
        var w = $('input:radio[name="iCheck"]:checked').val();
        var l = $('input:radio[name="linkType"]:checked').val();
        if (n == null || n == 0) {
            alert("线程数不能为空");
            return;
        } else if (t == null || t == 0) {
            alert("持续时间不能为空");
            return;
        } else if (w == null || w == "") {
            alert("请求文件不能为空");
            return;
        } else if(l == null || l == ""){
        	alert("链接方式不能为空");
        	return;
        }
        $.ajax({
            type: "get",
            url: "/runTest/startRun/" + PageId + "?count=" + n + "&testTime=" + t + "&fileName=" + w + "&linkType=" + l,
            success: function (result) {
                notify("测试已开始", result, "success");
            }, error: function (result) {
                notify("执行测试失败", result, "error");
            }
        });
    });
//
    $("#stopTest").click(function () {
        $.ajax({
            type: "get",
            url: "/runTest/stopRun/" + PageId,
            success: function (result) {
                notify("测试已停止", result, "success");
            }, error: function (result) {
                notify("停止执行测试失败", result, "error");
            }
        });
    });
    //
    $("#number")[0].value = 10;
    $("#testTime")[0].value = 120;
    $("#webLog2").hide();
    //
    var wbst;
    $("#switchWeblog").on("change", function (e) {
        if (wbst != null) {
            clearTimeout(wbst);
        }
        wbst = setTimeout(function () {
            if ($("#switchWeblog")[0].checked) {
                $("#webLog2").show();
                $("#innerWebLog").remove();
                webLogId = window.open("./weblog/"+PageId);
            } else {
                $("#webLog1").append('<iframe id="innerWebLog" src="./weblog/'+PageId+'" style="width:100%;height:800px;border:none;"></iframe>');
                $("#webLog2").hide();
                webLogId.close();
            }
        }, 100);
    })
    //异常Table上的批量按钮
    $("#exceptionToolBar except-null").on("change", function () {
        $("#exceptionToolBar except-null")
        // if(){}
    })

    //console exception
    var execTimeoutId;

    function consoleSwitcherFn() {
        if (execTimeoutId != null) {
            clearTimeout(execTimeoutId);
        }
        execTimeoutId = setTimeout(function () {
            executeExceptionOpt();
        }, 1000);//延迟1秒执行
    }

    $("#ExceptionDataTBody .except-null").on("change", consoleSwitcherFn);
    $("#ExceptionDataTBody .except-run").on("change", consoleSwitcherFn);
    $("#ExceptionDataTBody .except-lag").on("change", consoleSwitcherFn);

    //切换透传
    // $("#ExceptionDataTBody .btn-group .btn").on("click",function(e){
    //     console.log(e.currentTarget.parentNode.parentNode.)
    // });

    // for (var i = 0; i < ExceptionDatas.length; i++) {
    //     var exceptionData = ExceptionDatas[i];
    //     if(es.length==0){
    //         continue;
    //     }
    //     $(es[0]).on("click", function () {
    //         console.log("http://" + exceptionData.ip + ":8280/updateLinkStatus?serviceMode=STANDARD");
    //         $.ajax({
    //             type: "get",
    //             url: "http://" + exceptionData.ip + ":8280/updateLinkStatus?serviceMode=STANDARD",
    //             dataType : 'text',
    //             success: function (result) {
    //                 console.log(result);
    //             }
    //         });
    //     })
    //     $(es[1]).on("click", function () {
    //         $.ajax({
    //             type: "get",
    //             url: "http://" + exceptionData.ip + ":8280/updateLinkStatus?serviceMode=STANDARD2",
    //             dataType : 'text',
    //             success: function (result) {
    //                 console.log(result);
    //             }
    //         });
    //     })
    //     $(es[2]).on("click", function () {
    //         $.ajax({
    //             type: "get",
    //             url: "http://" + exceptionData.ip + ":8280/updateLinkStatus?serviceMode=STANDARD3",
    //             dataType : 'text',
    //             success: function (result) {
    //                 console.log(result);
    //             }
    //         });
    //     })
    // }

    //切换透传模式
    var es = $("#exceptionToolBar .btn-group .btn");
    es.on("click", function (e2) {
        var ip = $(e2.currentTarget).parent().parent().parent().children()[1].innerText;
        var mode = $(e2.currentTarget).children([0]).attr("value");
        $.ajax({
            type: "get",
            url: "http://" + ip + ":8280/updateLinkStatus?serviceMode=" + mode,
            dataType: 'text',
            success: function (result) {
                console.log(result);
                if (result.indexOf("OK") != -1) {
                    notify("切换成功", result, "success");
                } else {
                    notify("切换失败", result, "error");
                }
            },
            error: function (result) {
                notify("执行失败", result, "error");
            }
        });
    })

    /**
     * 断开数据库
     *
     * @type {boolean}
     */
    var defaultChecked5 = false;
    $("#tr_5 .except-break").on("change", function (e) {
        var checked = e.currentTarget.checked;
        if (checked != defaultChecked5) {//两次事件bug
            var flag = checked ? "0" : "1";
            // $.ajax({
            //     type: "get",
            //     url: "/script/ipSetting/add/input/1/ip/10.221.150.181?addr=10.221.8.11",
            //     success: function (result) {
            //         console.log("10.221.8.11--10.221.150.181" );
            //         console.log(result);
            //     }
            // });
            
            //数据库IP
        	var ip_database = "";
        	//中台IP数组
        	var ip_zt = new Array();
        	for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
                var exceptionData = GlobalData.ExceptionDatas[i];
                if(exceptionData.desc=="数据库"){
                	ip_database = exceptionData.ip;
                }else if(exceptionData.desc.indexOf("中台")>-1){
                	ip_zt.push(exceptionData.ip);
                }
            }
        	for(var i=0;i<ip_zt.length;i++){
        		$.ajax({
                    type: "get",
                    url: "/script/ipSetting/add/input/" + flag + "/port/5444?addr="+ip_zt[i],
                    success: function (result) {
                        console.log(ip_zt[i] + "--" + ip_database);
                        if (result.code == 0) {
                            notify(result.msg, result.data, "success");
                        } else {
                            notify(result.msg, result.data, "error");
                        }
                    },
                    error: function (result) {
                        notify("执行失败", result, "error");
                    }
                });
        	}
            /*$.ajax({
                type: "get",
                url: "/script/ipSetting/add/input/" + flag + "/ip/10.221.150.181?addr=10.221.8.12",
                success: function (result) {
                    console.log("10.221.8.12--10.221.150.181");
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });*/
            defaultChecked5 = e.currentTarget.checked;
        }
    })


    /**
     * 关闭模拟SearchOne
     *
     * 位于以下两个地址
     * http://10.221.8.17:8081
     * http://10.221.8.18:8090/sp-test-suit/mock-searchone/merge
     * @type {boolean}
     */
    var defaultChecked6 = false;
    $("#tr_6 .except-break").on("change", function (e) {
        var checked = e.currentTarget.checked;
        if (checked != defaultChecked6) {//两次事件bug
            var flag = checked ? "0" : "1";
            
            //模拟SearchOne
        	var ip_ms = "";
        	//中台IP数组
        	var ip_zt = new Array();
        	for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
                var exceptionData = GlobalData.ExceptionDatas[i];
                if(exceptionData.desc=="模拟Search One"){
                	ip_ms = exceptionData.ip;
                }else if(exceptionData.desc.indexOf("中台")>-1){
                	ip_zt.push(exceptionData.ip);
                }
            }
        	for(var i=0;i<ip_zt.length;i++){
        		$.ajax({
                    type: "get",
                    url: "/script/ipSetting/add/input/" + flag + "/ip/"+ip_ms+"?addr="+ip_zt[i],
                    success: function (result) {
                        console.log("断开连接"+ip_zt[i]+"--"+ip_ms);
                        console.log(result);
                        if (result.code == 0) {
                            notify(result.msg, result.data, "success");
                        } else {
                            notify(result.msg, result.data, "error");
                        }
                    },
                    error: function (result) {
                        notify("执行失败", result, "error");
                    }
                });
        	}
            /*$.ajax({
                type: "get",
                url: "/script/ipSetting/add/input/" + flag + "/ip/10.221.8.17?addr=10.221.8.12",
                success: function (result) {
                    console.log("断开连接10.221.8.12--10.221.8.17");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });
            $.ajax({
                type: "get",
                url: "/script/ipSetting/add/input/" + flag + "/ip/10.221.8.18?addr=10.221.8.12",
                success: function (result) {
                    console.log("断开连接10.221.8.12--10.221.8.18");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });*/
            defaultChecked6 = e.currentTarget.checked;
        }
    })

    /**
     * 关闭目标机器ELK对应的端口号访问权
     *
     * see:
     * /opt/app/filebeat-6.2.3-linux-x86_64/filebeat.yml
     *
     * output.logstash:
     # The Logstash hosts
     hosts: ["10.221.8.20:5044"]
     */
    var defaultChecked7 = false;
    $("#tr_7 .except-break").on("change", function (e) {
        var checked = e.currentTarget.checked;
        if (checked != defaultChecked7) {//两次事件bug
            var flag = checked ? "0" : "1";
            
        	//中台IP数组
        	var ip_zt = new Array();
        	for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
                var exceptionData = GlobalData.ExceptionDatas[i];
                if(exceptionData.desc.indexOf("中台")>-1){
                	ip_zt.push(exceptionData.ip);
                }
            }
        	for(var i=0;i<ip_zt.length;i++){
        		$.ajax({
                    type: "get",
                    url: "/script/ipSetting/add/output/" + flag + "/port/5044?addr="+ip_zt[i],
                    success: function (result) {
                        console.log("封闭5044端口");
                        console.log(result);
                        if (result.code == 0) {
                            notify(result.msg, result.data, "success");
                        } else {
                            notify(result.msg, result.data, "error");
                        }
                    },
                    error: function (result) {
                        notify("执行失败", result, "error");
                    }
                });
        	}
        	
            /*$.ajax({
                type: "get",
                url: "/script/ipSetting/add/output/" + flag + "/port/5044?addr=10.221.8.11",
                success: function (result) {
                    console.log("封闭5044端口");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });
            $.ajax({
                type: "get",
                url: "/script/ipSetting/add/output/" + flag + "/port/5044?addr=10.221.8.12",
                success: function (result) {
                    console.log("封闭5044端口");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });*/
            defaultChecked7 = e.currentTarget.checked;
        }
    })

    /**
     * 关闭Redis
     *
     * 通过关闭Zookeeper对应的端口号2181
     * Zookeeper位于：
     * ["10.221.169.227","10.221.169.228","10.221.169.229","10.221.8.11","10.221.8.12"]
     * 从而切断Redis
     *
     * @type {boolean}
     */
    var defaultChecked8 = false;
    $("#tr_8 .except-break").on("change", function (e) {
        var checked = e.currentTarget.checked;
        if (checked != defaultChecked8) {//两次事件bug
            var flag = checked ? "0" : "1";
            // var zookeepers=["10.221.169.227","10.221.169.228","10.221.169.229","10.221.8.11","10.221.8.12"];
            
          //中台IP数组
        	var ip_zt = new Array();
        	for (var i = 0; i < GlobalData.ExceptionDatas.length; i++) {
                var exceptionData = GlobalData.ExceptionDatas[i];
                if(exceptionData.desc.indexOf("中台")>-1){
                	ip_zt.push(exceptionData.ip);
                }
            }
        	for(var i=0;i<ip_zt.length;i++){
        		$.ajax({
                    type: "get",
                    url: "/script/ipSetting/add/output/" + flag + "/port/19000?addr=" + ip_zt[i],
                    success: function (result) {
                        console.log("封闭2181端口");
                        console.log(result);
                        if (result.code == 0) {
                            notify(result.msg, result.data, "success");
                        } else {
                            notify(result.msg, result.data, "error");
                        }
                    },
                    error: function (result) {
                        notify("执行失败", result, "error");
                    }
                });
        	}
            
            /*$.ajax({
                type: "get",
                url: "/script/ipSetting/add/output/" + flag + "/port/19000?addr=10.221.8.11",
                success: function (result) {
                    console.log("封闭2181端口");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });
            $.ajax({
                type: "get",
                url: "/script/ipSetting/add/output/" + flag + "/port/19000?addr=10.221.8.12",
                success: function (result) {
                    console.log("封闭2181端口");
                    console.log(result);
                    if (result.code == 0) {
                        notify(result.msg, result.data, "success");
                    } else {
                        notify(result.msg, result.data, "error");
                    }
                },
                error: function (result) {
                    notify("执行失败", result, "error");
                }
            });*/
            defaultChecked8 = e.currentTarget.checked;
        }
    })


});

/**
 * 抛出消息
 * 'success' 'info' 'error'
 * @param txt
 * @param type
 */
function notify(title, txt, type) {
    title = title || "执行成功";
    var p = new PNotify({
        title: title,
        text: txt,
        type: type,
        hide: true,
        styling: 'bootstrap3'
    });
}


