function forbidBackSpace(a) {
    var b = a || window.event, c = b.target || b.srcElement, d = c.type || c.getAttribute("type"),
        e = 8 == b.keyCode && "password" != d && "text" != d && "textarea" != d;
    return e ? !1 : void 0
}

function avoidCopy(a) {
    if (a = window.event || a, isKaoShi) return !1;
    var b;
    return a && (a.target ? b = a.target : a.srcElement && (b = a.srcElement), 3 == b.nodeType && (b = b.parentNode), "INPUT" == b.tagName || "TEXTAREA" == b.tagName || "SELECT" == b.tagName) ? !0 : (document.selection && document.selection.empty && document.selection.empty(), !1)
}

function showItemDesc(a, b, c) {
    var f, g, h, i, j, k, d = document.getElementById(a), e = document.getElementById("divDescPopData");
    e.innerHTML = d.innerHTML, f = trim(d.innerHTML), window.top != window && (ZheZhaoControl = b), 0 == f.indexOf("http") ? PDF_launch(f.replace(/&amp;/g, "&"), 800, 600) : (g = document.getElementById("divDescPop"), h = g.getElementsByTagName("iframe")[0], h && (i = h.getAttribute("xsrc"), i && h.setAttribute("src", i)), g.style.display = "", g.style.width = "500px", j = e.offsetHeight + 20, k = 500, 500 > j && j > 50 && (k = j), PDF_launch("divDescPop", 500, k)), stopPropa(c)
}

function getTop(a) {
    for (var b = a.offsetLeft, c = a.offsetTop; a = a.offsetParent;) b += a.offsetLeft, c += a.offsetTop;
    return {x: b, y: c}
}

function addEventSimple(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
}

function removeEventSimple(a, b, c) {
    a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
}

function Request(a) {
    var f, g, b = window.document.location.href, c = b.indexOf("?"), d = b.substr(c + 1), e = d.split("&");
    for (f = 0; f < e.length; f++) if (g = e[f].split("="), g[0].toUpperCase() == a.toUpperCase()) return g[1];
    return ""
}

function openCityBox(a, b, c, d) {
    var e, f, g, i;
    if (txtCurCity = a, "1" == a.getAttribute("lastdata") && (txtCurCity.lastData = 1), ZheZhaoControl = txtCurCity, d = d || "", e = a.getAttribute("province"), f = "", e && (f = "&pv=" + encodeURIComponent(e)), 3 == b) PDF_launch("/joinnew/setcitycounty.aspx?activityid=" + activityId + "&ct=" + b + f + "&pos=" + d, 450, 220); else if (5 == b) PDF_launch("/joinnew/setmenuselp.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, 470, 220); else if (6 == b) {
        if (ZheZhaoControl = null, g = "/wjx/join/amap.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, document.documentElement.clientHeight || document.body.clientHeight, i = !1, a.parent && a.parent.dataNode && a.parent.dataNode._needOnly ? i = !0 : a.parent && "1" == a.parent.getAttribute("needonly") ? i = !0 : "1" == a.getAttribute("needonly") && (i = !0), i && (g += "&nc=1", a.value)) return writeError(a.parent, "提示：定位后无法修改。", 0, !0), void 0;
        PDF_launch(g, 700, 800)
    } else 4 == b ? (ZheZhaoControl = null, PDF_launch("/joinnew/school.aspx?activityid=" + activityId + f, 700, 558)) : PDF_launch("/joinnew/setcity.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, 470, 220)
}

function setChoice(a) {
    var b = getPreviousNode(a);
    b && (b.value = a.value), curdiv && updateProgressBar(curdiv.dataNode)
}

function setCityBox(a, b) {
    var c, d, e;
    return b && "getlocalbtn" == txtCurCity.parentNode.className.toLowerCase() && (c = txtCurCity.parentNode.previousSibling, a && (c.style.display = "block", c.innerHTML = a, txtCurCity.parentNode.style.top = "0px")), txtCurCity.value = a, "TD" == txtCurCity.parentNode.tagName ? (txtCurCity.title = a, void 0) : (d = txtCurCity.offsetWidth, e = 13 * a.length, e > d && (txtCurCity.style.width = e + "px"), void 0)
}

function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}

function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a)
}

function replace_specialChar(a) {
    var b, c;
    for (b = 0; b < spChars.length; b++) c = new RegExp("(\\" + spChars[b] + ")", "g"), a = a.replace(c, spToChars[b]);
    return /^[A-Za-z\s\.,]+$/.test(a) && (a = a.replace(/\s+/g, " ")), a = a.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/gi, ""), trim(a)
}

function isRadioImage(a) {
    return a && "0" != a && "1" != a && "101" != a ? !0 : !1
}

function isRadioRate(a) {
    return "" != a && "0" != a && "1" != a && "-1" != a
}

function changeHeight(a) {
    var c, d, e, b = parseInt(a.style.height);
    b && (a.initHeight || (a.initHeight = b), c = 18, d = 100, e = a.scrollHeight, e = e > c ? e : c, e = e > d ? d : e, e - b >= 10 && (a.style.height = e + "px"), (!a.value || a.value.length < 5) && (a.style.height = a.initHeight + "px"))
}

function fcInputboxFocus() {
}

function lengthChange(a) {
    var b = a.value.length, c = a.size;
    b >= c && 80 >= c && (a.size = b + 2)
}

function fcInputboxBlur() {
    var a, b, c, d, e, f;
    if (this.value) {
        if (this.style.color = "#000000", 0 != langVer) return;
        if ("select" == this.tagName) return;
        for (a = this.parent, b = a.itemInputs, c = this.value.split(/(,|，)/gi), d = 0; d < b.length; d++) {
            if (e = getNextNode(b[d]), a.dataNode && a.dataNode.isSort && (e = b[d].parentNode.getElementsByTagName("label")[0]), !e) return;
            for (f = 0; f < c.length; f++) trim(c[f].toLowerCase()) == trim(e.innerHTML.toLowerCase()) && (popUpAlert("提示：您输入的“" + c[f] + "”已经包含在题目选项当中"), b[d].checked || b[d].parentNode.click(), e.style.color = "red", 1 == c.length && this.choiceRel && this.choiceRel.checked && (this.value = "", this.parentNode.click()))
        }
    } else this.value = defaultOtherText, this.style.color = "#999999"
}

function isTextBoxEmpty(a) {
    return a = trim(a), "" == a || a == defaultOtherText ? !0 : !1
}

function setMatrixFill() {
    (!curMatrixError || curMatrixFill.fillvalue) && (divMatrixRel.style.display = "none")
}

function showMatrixFill(a, b) {
    var c, d, e, f, g, h, i;
    if (b) {
        if (curMatrixError) return;
        curMatrixError = a
    }
    curMatrixFill = a, c = "请注明...", d = a.getAttribute("req"), d && (c = "请注明...[必填]"), 1 == langVer && (c = "Please specify"), e = a.fillvalue || a.getAttribute("fillvalue") || "", matrixinput.value = e, e || (matrixinput.value = c), f = getPreviousNode(a), g = getTop(f), h = g.y - 35, i = g.x - 190, divMatrixRel.style.top = h + "px", divMatrixRel.style.left = i + "px", divMatrixRel.style.display = ""
}

function refresh_validate() {
    imgCode && "none" != tCode.style.display && "none" != imgCode.style.display ? imgCode.src = "/wjx/join/AntiSpamImageGen.aspx?q=" + activityId + "&t=" + (new Date).valueOf() : 1 == window.useAliVerify ? captchaOjb.reload() : 2 == window.useAliVerify && captchaOjb.reset()
}

function enter_clicksub(a) {
    a = a || window.event, a && 13 == a.keyCode && (ktimes++, submit(1))
}

function showSubmitTable(a) {
    submit_table.style.display = a ? "" : "none";
    var b = document.getElementById("captcha");
    b && (b.style.display = a ? "" : "none")
}

function Init() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K,
        L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob,
        pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb;
    for (0 == cur_page && !displayPrevPage && pre_page && (pre_page.style.display = "none", pre_page.disabled = !0), pageHolder = $$tag("fieldset", survey), a = 0; a < pageHolder.length; a++) b = "true" == pageHolder[a].getAttribute("skip"), b && (pageHolder[a].skipPage = !0);
    for (submit_button.onmouseover = function () {
        ktimes++, this.className = "submitbutton submitbutton_hover", isPub && "" != document.getElementById("spanTest").style.display && "3" != hasJoin && (document.getElementById("spanTest").style.display = "", document.getElementById("submittest_button").onmouseover = function () {
            show_status_tip("您是发布者，可以进行试填问卷，试填的答卷不会参与结果统计！", 5e3), document.getElementById("submittest_button").onmouseover = null
        })
    }, submit_button.onclick = function () {
        return window.isWaiGuan ? (popUpAlert("提示：问卷外观设置页面，只能预览，不能提交！"), void 0) : (checkDisalbed() || submit(1), void 0)
    }, isPub && (document.getElementById("submittest_button").onclick = function () {
        maxCheatTimes > 0 && (fireConfirm = !0), confirm("试填后的答卷不会参与结果统计，确定试填吗？") && submit(5)
    }), "3" == hasJoin && (c = document.getElementById("divEdtTip"), c && (c.style.display = "none"), submit_button.onclick = function () {
        checkDisalbed() || (maxCheatTimes > 0 && (fireConfirm = !0), window.confirm("确定编辑此答卷吗？") && (isEdtData = !0, submit(6)))
    }), 1 == totalPage && "true" == isRunning && "1" != hasJoin ? showSubmitTable(!0) : "true" != isRunning ? (d = document.getElementById("spanNotSubmit"), d && "" != trim(d.innerHTML) ? (1 == totalPage && "1" != hasJoin && showSubmitTable(!0), nextPageAlertText = d.innerHTML.replace(/<[^>]*>/g, ""), submit_button.onclick = function () {
        checkDisalbed() || (popUpAlert(nextPageAlertText), d.scrollIntoView())
    }) : showSubmitTable(!1)) : showSubmitTable(!1), pre_page && (pre_page.onclick = show_pre_page), next_page && (next_page.onclick = show_next_page), tCode && "none" != tCode.style.display && "true" == isRunning && (submit_text.value = validate_info_submit_title3, addEventSimple(submit_text, "blur", function () {
        "" == submit_text.value && (submit_text.value = validate_info_submit_title3)
    }), addEventSimple(submit_text, "focus", function () {
        submit_text.value == validate_info_submit_title3 && (submit_text.value = "")
    }), imgCode.style.display = "none", 0 != langVer && (imgCode.alt = ""), addEventSimple(submit_text, "click", function () {
        var a, b, c;
        needAvoidCrack || "none" != imgCode.style.display ? needAvoidCrack && !imgVerify && (a = document.getElementById("divCaptcha"), a.style.display = "", imgVerify = a.getElementsByTagName("img")[0], imgVerify.style.cursor = "pointer", imgVerify.onclick = function () {
            var a = new Date, b = a.getTime() + 6e4 * a.getTimezoneOffset(),
                c = window.location.host || "www.sojump.com",
                d = "//" + c + "/botdetect/" + activityId + ".aspx?get=image&c=" + this.captchaId + "&t=" + this.instanceId + "&d=" + b;
            this.src = d
        }, b = imgVerify.getAttribute("captchaid"), c = imgVerify.getAttribute("instanceid"), imgVerify.captchaId = b, imgVerify.instanceId = c, imgVerify.onclick()) : (imgCode.style.display = "", imgCode.onclick = refresh_validate, imgCode.onclick(), imgCode.title = validate_info_submit_title1)
    })), e = 0; e < pageHolder.length; e++) {
        for (f = $$tag("div", pageHolder[e]), hasJoin && (pageHolder[e].style.display = ""), g = new Array, h = new Array, i = 0, a = 0; a < f.length; a++) j = f[a].className.toLowerCase(), "div_question" == j ? (k = "1" == f[a].getAttribute("istrap"), f[a].onclick = divQuestionClick, f[a].onmouseover = function () {
            ktimes++
        }, k ? (f[a].isTrap = !0, trapHolder.push(f[a]), initItem(f[a]), f[a].pageIndex = e + 1) : (f[a].indexInPage = i, g[i] = f[a], g[i].pageIndex = e + 1, i++, totalQ++)) : f[a].id && 0 == f[a].id.indexOf("divCut") && h.push(f[a]);
        pageHolder[e].questions = g, pageHolder[e].cuts = h
    }
    for (set_data_fromServer(qstr), l = new Array, m = 0; m < pageHolder.length; m++) {
        for (n = pageHolder[m].questions, a = 0; a < n.length; a++) {
            if (o = n[a].dataNode, p = o._type, q = n[a].getAttribute("relation"), r = n[a].getAttribute("isshop"), "1" == r && (n[a].isShop = !0, shopHT.push(n[a])), s = "", q && "0" != q) {
                if (s = -1 != q.indexOf("|") ? "|" : "$", "" != s && -1 != q.indexOf(s)) {
                    for (t = q.split(s), e = 0; e < t.length; e++) if (u = t[e], u && -1 != u.indexOf(",")) {
                        for (v = u.split(","), w = v[0], x = v[1].split(";"), y = 0; y < x.length; y++) z = w + "," + x[y], relationGroupHT[z] || (relationGroupHT[z] = new Array), relationGroupHT[z].push(n[a]);
                        relationQs[w] || (relationQs[w] = new Array), relationQs[w].push(n[a]), -1 == relationGroup.indexOf(w) && relationGroup.push(w)
                    }
                } else {
                    for (v = q.split(","), w = v[0], x = v[1].split(";"), y = 0; y < x.length; y++) z = w + "," + x[y], relationHT[z] || (relationHT[z] = new Array), relationHT[z].push(n[a]);
                    relationQs[w] || (relationQs[w] = new Array), relationQs[w].push(n[a])
                }
                relationNotDisplayQ[o._topic] = "1"
            } else "0" == q && (relationNotDisplayQ[o._topic] = "1");
            if ("page" != p && "cut" != p && (questionsObject[o._topic] = n[a]), A = n[a].getAttribute("titletopic"), A && (B = questionsObject[A], B && (B.dataNode._titleTopic || (B.dataNode._titleTopic = new Array), B.dataNode._titleTopic.push(o._topic), C = document.getElementById("divTitle" + o._topic), C && (C.innerHTML = C.innerHTML.replace("[q" + A + "]", "<span id='spanTitleTopic" + o._topic + "' style='text-decoration:underline;'></span>")))), "1" != n[a].getAttribute("hrq")) {
                if (("radio" == p || "check" == p) && ("radio" == p && isRadioImage(o._mode) ? initLikertItem(n[a]) : (initItem(n[a]), checkPeiE(n[a]))), "fileupload" == p) {
                    for (D = $$tag("iframe", n[a]), f = $$tag("div", n[a]), E = 0; E < f.length; E++) if ("uploadmsg" == f[E].className.toLowerCase()) {
                        n[a].uploadmsg = f[E], f[E].style.color = "red";
                        break
                    }
                    for (F = null, G = 0; G < D.length; G++) if (D[G].id && 0 == D[G].id.indexOf("uploadFrame")) {
                        F = D[G];
                        break
                    }
                    n[a].uploadFinish = function (a, b, c) {
                        this.uploadmsg.innerHTML = a, c && (this.uploadmsg.innerHTML += "<div><img src='" + c + "' alt='' /></div>"), this.fileName = b, isUploadingFile = !1, this.uploadFrame.style.display = "";
                        var d = document.frames ? document.frames[this.uploadFrame.id] : document.getElementById(this.uploadFrame.id).contentWindow;
                        d.curdiv = this, d._ext = this.dataNode._ext, updateProgressBar(this.dataNode), jump(this, this.uploadFrame)
                    }, F && (n[a].uploadFrame = F, n[a].uploadFrame.allowTransparency = !0, H = document.frames ? document.frames[F.id] : document.getElementById(F.id).contentWindow, H.curdiv = n[a], H._ext = o._ext, I = F.getAttribute("fn"), I && "(空)" != I && n[a].uploadFinish("文件已经成功上传！", I))
                }
                if ("matrix" == p) {
                    if (J = o._mode, o._hasjump && (J && 0 > J - 100 ? initLikertItem(n[a]) : initItem(n[a])), K = n[a].getAttribute("DaoZhi"), L = null, K) {
                        for (M = $$tag("tr", n[a]), L = new Array, N = M[0].cells.length - 1, O = 0; N > O; O++) L[O] = M[0].cells[O + 1], L[O].itemInputs = new Array;
                        for (O = 0; N > O; O++) for (P = 0; P < M.length; P++) L[O].parent = n[a], Q = M[P].cells[O + 1], Q.parent = L[O], Q.onclick = function () {
                            var a, b, c;
                            if (curMatrixItem != this.parent) {
                                if (a = this.parent.itemInputs) for (b = 0; b < a.length; b++) a[b].parentNode.style.background = "#edfafe";
                                if (curMatrixItem && curMatrixItem.daoZhi) for (a = curMatrixItem.itemInputs, b = 0; b < a.length; b++) a[b].parentNode.style.background = "";
                                divMatrixItemClick.call(this.parent)
                            }
                            this.parent.parent && (c = this.parent.parent.dataNode, c._maxvalue && (c._maxValue = c._maxvalue), c._minvalue && (c._minValue = c._minvalue), checkMinMax(this.getElementsByTagName("input")[0], this.parent.parent.dataNode, this.parent))
                        }, L[O].daoZhi = !0, R = Q.getElementsByTagName("input")[0], R && L[O].itemInputs.push(R)
                    } else L = $$tag("tr", n[a]);
                    if (!K) for (E = 0; E < L.length; E++) {
                        if ("303" != J) S = "none" == L[E].style.display, S || (J && 0 > J - 100 ? initLikertItem(L[E]) : K || initItem(L[E])); else if (T = $$tag("select", L[E]), T.length > 0 && (L[E].itemSels = T), o._hasjump) for (U = 0; U < T.length; U++) T[U].parent = L[E], T[U].onchange = function () {
                            var d, e, f, a = this.parent.parent, b = a.itemTrs, c = !1;
                            for (d = 0; d < b.length; d++) if (e = b[d].itemSels) {
                                for (f = 0; f < e.length; f++) if (e[f].value) {
                                    c = !0;
                                    break
                                }
                                if (c) break
                            }
                            jumpAny(c, a)
                        };
                        L[E].parent = n[a], L[E].onclick = divMatrixItemClick
                    }
                    if ("301" == J || "102" == J) {
                        if (V = n[a].getAttribute("minvalue"), W = n[a].getAttribute("maxvalue"), n[a].dataNode._minvalue = V, n[a].dataNode._maxvalue = W, "301" == J) for (n[a].dataNode._verify = "数字", "1" == n[a].getAttribute("digittype") && (n[a].dataNode._verify = "小数"), n[a].dataNode._minword = V, n[a].dataNode._maxword = W, X = $$tag("textarea", n[a]), E = 0; E < X.length; E++) X[E].parent = n[a], X[E].onblur = function () {
                            txtChange(this)
                        }
                    } else if ("302" == J) {
                        for (X = $$tag("textarea", n[a]), E = 0; E < X.length; E++) X[E].parent = n[a], X[E].onblur = function () {
                            var b, a = this.parent;
                            a.removeError && a.removeError(), b = validateMatrix(a.dataNode, this, this), b && (a.errorControl = this, writeError(a, verifyMsg, 3e3)), txtChange(this)
                        };
                        if (Y = n[a].getAttribute("minvalue")) for (Z = document.createElement("div"), Z.innerHTML = "<i class='increase-icon'></i><span>继续填写</span>", $ = "divquestion" + n[a].dataNode._topic, _ = document.getElementById($), _ && _.appendChild(Z), Z.className = "increase-btn", ab = n[a].getElementsByTagName("table")[0], bb = ab.tBodies[0].rows, cb = ab.tHead.getElementsByTagName("th"), cb[0].style.display = "none", Z.parent = n[a], n[a].addbtn = Z, Z.onclick = function () {
                            var g, a = this, b = this.parent, c = b.getElementsByTagName("table")[0],
                                d = c.tBodies[0].rows, e = b.getAttribute("maxvalue"), f = 0;
                            for (g = 0; g < d.length; g++) "" === d[g].style.display && f++;
                            for (g = 0; g < d.length; g++) if (f + 1 == e && (a.className = "increase-btn disable-style"), g == f) {
                                d[g].style.display = "", d[g].previousSibling.getElementsByTagName("i")[0].style.display = "none";
                                break
                            }
                        }, E = 0; E < bb.length; E++) bb[E].cells[0].style.display = "none", db = document.createElement("th"), db.innerHTML = "<i class='delete-icon'></i>", bb[E].appendChild(db), db.style.width = "16px", eb = db.getElementsByTagName("i")[0], E >= Y ? (bb[E].style.display = "none", hasJoin && (fb = bb[E].getElementsByTagName("textarea")[0], fb && fb.value && (bb[E].style.display = ""))) : eb.style.display = "none", db.parent = n[a], eb.onclick = function () {
                            var h, a = this.parentNode.parent, b = a.addbtn,
                                c = this.parentNode.parentNode.getAttribute("rindex"), d = this.parentNode.parentNode,
                                e = this.parentNode.parentNode.previousSibling,
                                f = this.parentNode.parentNode.parentNode.parentNode.tBodies[0].rows, g = 0;
                            for (h = 0; h < f.length; h++) "" === f[h].style.display && g++;
                            d.style.display = "none", c - Y > 0 && (e.getElementsByTagName("i")[0].style.display = ""), g == f.length && (b.className = "increase-btn")
                        }
                    }
                    L.length > 0 && (n[a].itemTrs = L)
                }
                if ("sum" == p) {
                    for (initItem(n[a]), L = $$tag("tr", n[a]), gb = new Array, E = 0; E < L.length; E++) hb = L[E].getAttribute("rowid"), hb && (L[E].parent = n[a], gb.push(L[E]));
                    for (ib = n[a].itemInputs.length, jb = n[a].itemInputs, E = 0; ib > E; E++) jb[E].onblur = function () {
                        txtChange(this)
                    };
                    gb.length > 0 && (n[a].itemTrs = gb), kb = n[a].getAttribute("rel"), n[a].relSum = document.getElementById(kb)
                }
                if ("check" == p && o.isSort) {
                    for (lb = $$tag("li", n[a]), E = 0; E < lb.length; E++) lb[E].onclick = itemSortClick, lb[E].style.cursor = "pointer", lb[E].onmouseover = function () {
                        this.style.background = "#efefef"
                    }, lb[E].onmouseout = function () {
                        this.style.background = ""
                    };
                    for (mb = lb[0].parentNode.getAttribute("dval"), nb = new Array, E = 0; E < n[a].itemInputs.length; E++) "checkbox" == n[a].itemInputs[E].type && nb.push(n[a].itemInputs[E]);
                    if (mb) for (ob = mb.split(","), E = 0; E < ob.length; E++) for (e = 0; e < lb.length; e++) if (nb[e].value == ob[E]) {
                        lb[e].onclick();
                        break
                    }
                }
                if ("question" == p) pb = $$tag("textarea", n[a]), pb.length > 0 ? (o._needOnly && "3" == hasJoin && (pb[0].readOnly = !0, pb[0].isOnly = !0), pb[0].onkeyup = function () {
                    txtChange(this), referTitle(this.parent, this.value)
                }, pb[0].onclick || (pb[0].onclick = pb[0].onkeyup), pb[0].onblur = pb[0].onchange = function () {
                    txtChange(this, 1), referTitle(this.parent, this.value)
                }, pb[0].parent = n[a], n[a].itemTextarea = pb[0], pb[1] && (qb = getPreviousNode(pb[1]), qb.par = n[a], pb[1].par = n[a], n[a].needsms = !0, n[a].mobileinput = pb[0], n[a].verifycodeinput = pb[1], pb[2] && (qb.txtCode = pb[2]), qb.onclick = function () {
                    var a, b, c, d, e;
                    if (!this.disabled) {
                        if (a = this.par, a.mobileinput.value = trim(a.mobileinput.value), !/^\d{11}$/.test(a.mobileinput.value)) return popUpAlert("请输入正确的手机号码"), void 0;
                        if ((!a.issmsvalid || a.mobile != a.mobileinput.value) && !this.isSending && qb.txtCode && (this.repeat && maxCheatTimes > 0 && (fireConfirm = !0), !this.repeat || confirm("您输入的手机号码“" + a.mobileinput.value + "”确认准确无误吗？"))) {
                            if ("1" == this.getAttribute("nocode")) return qb.sendActivitySms("0000"), void 0;
                            b = "divVCode" + a.dataNode._topic, c = document.getElementById(b), PDF_launch(b, 300, 70), d = c.getElementsByTagName("textarea")[0], e = c.getElementsByTagName("img")[0], "none" == e.style.display ? (e.onclick = function () {
                                this.src = "/wjx/join/AntiSpamImageGen.aspx?t=" + (new Date).valueOf()
                            }, e.style.display = "", e.onclick()) : e.onclick(), d.onkeyup = d.onblur = function () {
                                var a = /^[0-9a-zA-Z]{4}$/g;
                                a.test(this.value) && (qb.sendActivitySms(this.value), this.value = "", PDF_close())
                            }, d.focus()
                        }
                    }
                }, qb.sendActivitySms = function (a) {
                    var b, c, d;
                    this.isSending = !0, this.disabled = !0, b = this.par, c = this, d = getXmlHttp(), d.onreadystatechange = function () {
                        var a, e, f;
                        4 == d.readyState && 200 == d.status && (a = d.responseText, e = "", f = !1, "true" == a ? (e = "成功发送，每天最多发送5次。如未收到，请检查手机号是否正确！", f = !0, c.repeat = !0, c.resent()) : "fast" == a ? (e = "发送频率过快", c.resent()) : e = "no" == a ? "发布者短信数量不够" : "fail" == a ? "短信发送失败，每天最多发送5次！" : "error" == a ? "手机号码不正确" : "nopub" == a ? "问卷未运行，不能填写" : a, e && (b.errorMessage && (b.errorMessage.innerHTML = ""), writeError(b, "提示：" + e, 3e3, f)), e.indexOf("图形验证码") > -1 && (c.disabled = !1), c.isSending = !1)
                    }, d.open("get", "/joinnew/AnswerSmsHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&valcode=" + a + "&t=" + (new Date).valueOf()), d.send(null)
                }, qb.resent = function () {
                    var a = this, b = 60, c = setInterval(function () {
                        b--, 57 > b && (a.isSending = !1), b > 0 ? a.innerHTML = "重发(" + b + "秒)" : (a.innerHTML = "发送验证码", a.disabled = !1, clearInterval(c))
                    }, 1e3)
                }, pb[1].onchange = pb[1].onblur = function () {
                    var c, a = trim(this.value), b = this.par;
                    return 6 != a.length ? (b.errorMessage && (b.errorMessage.innerHTML = ""), writeError(b, "提示：请输入6位数字！", 3e3, !0), void 0) : /^\d+$/.exec(a) ? (b.issmsvalid && b.mobile == b.mobileinput.value || b.prevcode != a && (b.prevcode = a, c = getXmlHttp(), c.onreadystatechange = function () {
                        var a, d, e;
                        4 == c.readyState && 200 == c.status && (a = c.responseText, b.issmsvalid = !1, d = "", e = !1, "true" == a ? (b.issmsvalid = !0, e = !0, b.mobile = pb[0].value, d = "成功通过验证") : "send" == a ? d = "请先发送验证码，每天最多发送5次！" : "no" == a ? d = "验证码输入错误超过5次，无法再提交" : "error" == a && (d = "验证码输入错误"), d && (b.errorMessage && (b.errorMessage.innerHTML = ""), writeError(b, "提示：" + d, 3e3, e)))
                    }, c.open("get", "/joinnew/AnswerSmsValidateHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&code=" + escape(a) + "&t=" + (new Date).valueOf()), c.send(null)), void 0) : (b.errorMessage && (b.errorMessage.innerHTML = ""), writeError(b, "提示：请输入6位数字！", 3e3, !0), void 0)
                })) : "密码" == n[a].dataNode._verify && (pb = $$tag("input", n[a]), rb = pb[0], pb[0].parent = n[a], rb.onkeyup = function () {
                    txtChange(this)
                }, rb.onclick || (rb.onclick = rb.onkeyup), n[a].itemTextarea = pb[0], pb[1] && (pb[0].confirmPwd = pb[1], pb[1].parent = n[a], pb[1].firstPwd = rb, pb[1].onkeyup = function () {
                    rb.needCheckConfirm = !0, txtChange(this)
                })); else if ("gapfill" == p) {
                    for (pb = $$tag("input", n[a]), sb = 0; sb < pb.length; sb++) pb[sb].parent = n[a], pb[sb].onkeyup = function () {
                        txtChange(this)
                    }, pb[sb].onclick || (pb[sb].onclick = pb[sb].onkeyup), pb[sb].onblur = pb[sb].onchange = function () {
                        txtChange(this, 1), referTitle(this.parent, this.value)
                    };
                    n[a].gapFills = pb
                }
                for ("radio_down" == p && (tb = $$tag("select", n[a]), tb.length > 0 && (tb[0].onchange = itemClick, tb[0].parent = n[a], n[a].itemSel = tb[0])), ub = $$tag("div", n[a]), vb = 0, wb = null, E = 0; E < ub.length; E++) "div_title_question" == ub[E].className.toLowerCase() ? n[a].divTitle = ub[E] : "slider" == ub[E].className.toLowerCase() && ("matrix" == p || "sum" == p ? (wb = ub[E].parentNode.parentNode, vb++) : "slider" == p && (wb = n[a]), wb.divSlider = ub[E], ub[E].parent = wb, V = ub[E].getAttribute("minvalue"), W = ub[E].getAttribute("maxvalue"), n[a].dataNode._minvalue = V, n[a].dataNode._maxvalue = W, "sum" == p ? xb = wb.getElementsByTagName("input")[0] : (yb = ub[E].getAttribute("rel"), xb = document.getElementById(yb)), zb = new neverModules.modules.slider({
                    targetId: ub[E].id,
                    sliderCss: "imageSlider1",
                    barCss: "imageBar1",
                    min: parseInt(V),
                    max: parseInt(W),
                    sliderValue: xb,
                    hints: slider_hint,
                    change: itemClick
                }), zb.create(), wb.sliderImage = zb, Ab = ub[E].getAttribute("defvalue"), Ab && isInt(Ab) && (zb.setValue(parseInt(Ab)), wb.divSlider.value = parseInt(Ab), "sum" == p && (n[a].sumLeft = hasJoin && Ab ? void 0 == n[a].sumLeft ? o._total - parseInt(Ab) : n[a].sumLeft - parseInt(Ab) : 0)), "1" == hasJoin && (zb._slider.onclick = function () {
                }, zb._initMoveSlider = function () {
                }));
                if ("matrix" == p && (Bb = new Array, L = n[a].itemTrs)) {
                    for (E = 0; E < L.length; E++) P = L[E].getAttribute("rindex"), parseInt(P) == P && Bb.push(L[E]);
                    Bb.length > 0 && (n[a].itemTrs = Bb)
                }
                o && o._hasjump && (cur_page = m, hasJoin ? jumpJoin(n[a], m) : clearAllOption(n[a]), cur_page = 0), o._referedTopics && l.push(n[a]), hasJoin && window.cancelInputClick && cancelInputClick(n[a])
            }
        }
        m > 0 && hasJoin && (pageHolder[m].style.display = "none")
    }
    if (completeLoaded = !0, window.cepingCandidate) {
        for (Cb = cepingCandidate.split("&nbsp;&nbsp;&nbsp;"), Db = new Object, Eb = 0; Eb < Cb.length; Eb++) Fb = Cb[Eb].replace(/(\s*)/g, "").replace(/&/g, "").replace(/\\/g, "").replace("&nbsp;", "").toLowerCase(), Db[Fb] = "1";
        if (n = pageHolder[0].questions[0], n.itemInputs) for (a = 0; a < n.itemInputs.length; a++) Gb = n.itemInputs[a].parentNode, Hb = Gb.getElementsByTagName("label")[0], Hb && (Ib = trim(Hb.innerHTML).toLowerCase(), Ib = Ib.replace(/(\s*)/g, "").replace(/&amp;/g, "").replace(/\\/g, "").replace("&nbsp;", ""), Db[Ib] && (n.itemInputs[a].checked = !0));
        createItem(n), n.style.display = "none", n.isCepingQ = "1"
    }
    if (window.totalCut && window.totalCut > 0) for (a = 0; a < window.totalCut; a++) {
        if (Jb = document.getElementById("divCut" + (a + 1)), q = Jb.getAttribute("relation"), q && "0" != q) if (s = "", s = -1 != q.indexOf("|") ? "|" : "$", "" != s && -1 != q.indexOf(s)) {
            for (t = q.split(s), e = 0; e < t.length; e++) if (u = t[e], u && -1 != u.indexOf(",")) {
                for (v = u.split(","), w = v[0], x = v[1].split(";"), y = 0; y < x.length; y++) z = w + "," + x[y], relationGroupHT[z] || (relationGroupHT[z] = new Array), relationGroupHT[z].push(Jb);
                relationQs[w] || (relationQs[w] = new Array), relationQs[w].push(Jb), -1 == relationGroup.indexOf(w) && relationGroup.push(w)
            }
        } else {
            for (v = q.split(","), w = v[0], x = v[1].split(";"), relationNotDisplayQ[Jb.getAttribute("topic")] = "1", y = 0; y < x.length; y++) z = w + "," + x[y], relationHT[z] || (relationHT[z] = new Array), relationHT[z].push(Jb);
            relationQs[w] || (relationQs[w] = new Array), relationQs[w].push(Jb)
        }
        A = Jb.getAttribute("titletopic"), A && (B = questionsObject[A], B && (B.dataNode._titleTopic || (B.dataNode._titleTopic = new Array), Kb = Jb.getAttribute("topic"), B.dataNode._titleTopic.push(Kb), C = Jb.childNodes[0], C && (C.innerHTML = C.innerHTML.replace("[q" + A + "]", "<span id='spanTitleTopic" + Kb + "' style='text-decoration:underline;'></span>"))))
    }
    if (!window.cepingCandidate) for (a = 0; a < l.length; a++) i = l[a], createItem(i);
    for (m = 0; m < pageHolder.length; m++) for (n = pageHolder[m].questions, a = 0; a < n.length; a++) o = n[a].dataNode, Kb = o._topic, relationQs[Kb] && relationJoin(n[a]), hasJoin && referTitle(n[a]), Lb = n[a].getAttribute("qingjing"), "" == n[a].style.display && Lb && (Mb = n[a].getElementsByTagName("input")[0], Mb && (Mb.checked = !0, displayRelationRaidoCheck(n[a], o)));
    for (m = 0; m < pageHolder.length; m++) for (n = pageHolder[m].questions, a = 0; a < n.length; a++) checkPeiE(n[a]);
    if (lastSavePage > 0 && totalPage > lastSavePage && (pageHolder[0].style.display = "none", cur_page = lastSavePage - 1, show_next_page(!0)), lastSaveQ >= 1 && (Nb = document.getElementById("div" + lastSaveQ))) {
        for (Nb.scrollIntoView(), Nb.onclick(), joinedTopic = lastSaveQ, a = 1; lastSaveQ >= a; a++) progressArray[a + ""] = !0;
        showProgressBar()
    }
    0 == totalQ && showSubmitTable(!1), processMinMax(), showProgressBar(), window.jqLoaded && jqLoaded()
}

function getMaxTimeStr(a) {
    var e, b = "", c = a, d = parseInt(c / 3600);
    return d ? (10 > d && (b += "0"), b += d + ":", c %= 3600) : b = "00:", e = parseInt(c / 60), e ? (10 > e && (b += "0"), b += e + ":", c %= 60) : b += "00:", 0 > c && (c = 0), c ? (10 > c && (b += "0"), b += c) : b += "00", b
}

function autoSubmit(a) {
    var b, c, d;
    if (isAutoSubmit = !0, hasSurveyTime) for (b = 0; totalPage - 1 > cur_page && (pageHolder[cur_page].hasExceedTime = !0, show_next_page(), !(b > totalPage));) b++;
    ktimes++, pageHolder[cur_page].hasExceedTime = !0, totalPage - 1 > cur_page ? (show_next_page(), isAutoSubmit = !1) : (pageHolder[cur_page].style.display = "none", submit_button.initVal && (submit_button.value = submit_button.initVal), submit_button.disabled = !1, c = "提示：您的作答时间已经超过最长时间限制，请直接提交答卷！", 1 == langVer && (c = "Time is up,please submit!"), a && (c = a), hasSurveyTime && "none" == tCode.style.display && hasAnswer && !a && !allowWeiXin ? (isAutoSubmit = !1, submit(1)) : submit_div.divAlert || (d = document.createElement("div"), d.style.color = "red", d.style.fontSize = "16px", d.style.marginTop = "10px", d.innerHTML = c, d.style.textAlign = "center", submit_div.insertBefore(d, submit_table), submit_div.divAlert = d)), isAutoSubmit = !1
}

function processMinMax() {
    var a, b, c, d, e, f, g;
    maxTimer && clearInterval(maxTimer), minTimer && clearInterval(minTimer), "true" == isRunning && (a = pageHolder[cur_page]._maxtime, b = document.getElementById("spanTimeTip"), window.hasSurveyTime && (initMaxSurveyTime || (initMaxSurveyTime = window.maxSurveyTime), a = window.maxSurveyTime, cur_page > 0 && a--, b && (b.innerHTML = "剩余作答时间")), c = new Date, a && (1 == langVer && (b.innerHTML = "Remaining "), addEventSimple(window, "resize", resizeMaxTime), mmMaxTime(), hasMaxtime = !0, divMaxTime.style.display = "", d = divMaxTime.getElementsByTagName("b")[0], d && (d.innerHTML = ""), spanMaxTime.innerHTML = getMaxTimeStr(a), maxTimer = setInterval(function () {
        var b = new Date, d = parseInt((b - c) / 1e3), e = a - d;
        window.maxSurveyTime && window.maxSurveyTime--, spanMaxTime.innerHTML = getMaxTimeStr(e), 0 >= e && (clearInterval(maxTimer), divMaxTime.style.display = "none", autoSubmit())
    }, 1e3)), e = pageHolder[cur_page]._mintime, f = !IsSampleService || IsSampleService && "t" == promoteSource || window.pubNeedApply, f || (e = 0), e && (pageHolder[cur_page]._istimer ? (g = e, next_page && (next_page.style.display = "none"), pre_page && (pre_page.style.display = "none"), minTimer = setInterval(function () {
        var a = new Date, b = parseInt((a - c) / 1e3);
        g = e - b, 0 >= g && (clearInterval(minTimer), totalPage - 1 > cur_page ? show_next_page() : (popUpAlert("提示：您的作答时间已经超过最长时间限制，请直接提交答卷！"), pageHolder[cur_page].style.display = "none"))
    }, 1e3)) : (isSuper || (next_page && (next_page.disabled = !0), submit_button.disabled = !0), next_page && (next_page.initVal = next_page.value), submit_button.initVal || (submit_button.initVal = submit_button.value), next_page && (next_page.value = e + minTimeTip), submit_button.value = e + minTimeTip, g = e, minTimer = setInterval(function () {
        var a = new Date, b = parseInt((a - c) / 1e3);
        g = e - b, next_page && (next_page.value = g + minTimeTip), submit_button.value = g + minTimeTip, 0 >= g && (clearInterval(minTimer), next_page && (next_page.disabled = !1), submit_button.disabled = !1, next_page && (next_page.value = next_page.initVal), submit_button.value = submit_button.initVal)
    }, 1e3))))
}

function resizeMaxTime() {
    resizedMax = !0, mmMaxTime()
}

function mmMaxTime() {
    var b, a = document.getElementById("mainCss");
    return a ? (b = getTop(a), divMaxTime.style.top = b.y + "px", divMaxTime.style.left = b.x - 120 + "px", void 0) : (divMaxTime.style.right = "50px", void 0)
}

function getPreviousNode(a) {
    var b = a.previousSibling;
    return b && 1 != b.nodeType && (b = b.previousSibling), b
}

function getNextNode(a) {
    var b = a.nextSibling;
    return b && 1 != b.nodeType && (b = b.nextSibling), b
}

function updateCart() {
    var d, e, f, g, h, i, j, k, l, m, n, o, a = "", b = 0, c = 0;
    for (d = 0; d < shopHT.length; d++) if (e = shopHT[d], "none" != e.style.display) for (f = e.itemInputs, g = 0; g < f.length; g++) h = f[g], i = parseInt(h.value), 0 != i && (j = h.parentNode.parentNode, k = $$tag("div", j)[0].innerHTML, l = $$tag("p", j)[0].getAttribute("price"), m = i * parseFloat(l), n = '<li class="productitem"><span class="fpname">' + k + '</span><span class="fpnum">x' + i + '</span><span class="fpprice">￥' + toFixed0d(m) + "</span></li>", a += n, b += m, c += i);
    a = "<ul class='productslist'><li><span class='fpname' style='font-weight:bold; color:#333;font-size:14px; padding-bottom:16px;'>结算清单</span></li>" + a + "</ul>" + '<div class="ftotalprice" style="position:relative;"><span style="position:absolute;left:78%;color:#333">x' + c + '</span><span class="priceshow">￥' + toFixed0d(b) + "</span></div>", o = document.getElementById("shopcart"), o.innerHTML = a, o.style.display = b > 0 ? "" : "none"
}

function toFixed0d(a) {
    return a.toFixed(2).replace(".00", "")
}

function checkPeiE(a) {
    var c, d, e, f, g, h, i, j;
    if (!hasPeiEFull && a.dataNode._requir) {
        if ("1" == a.getAttribute("peie") && "" == a.style.display) {
            for (c = !0, d = a.itemInputs, e = 0; e < d.length; e++) if (f = d[e].disabled, !f) {
                c = !1;
                break
            }
            c && (hasPeiEFull = !0)
        }
        g = 0, "1" == a.getAttribute("qingjing") && "" == a.style.display && (h = a.getElementsByTagName("ul")[0], h && "1" == h.getAttribute("full") && (hasPeiEFull = !0, g = 1)), hasPeiEFull && (i = document.getElementById("spanNotSubmit"), peiemsg = "此问卷配额已满，暂时不能填写！", g && (peiemsg = "此问卷情景题配额已满，不能填写。"), i ? i.innerHTML = peiemsg : (j = document.getElementById("divPeiE"), j.style.display = "", j.innerHTML = "<div style='background:#FFE4C8;color:#3E3E3E;border-radius:8px; padding:8px 15px; margin: 15px auto;width: 650px; text-align: left; clear: both; font-size:14px;'><span id='spanNotSubmit'>" + peiemsg + "</span></div>"))
    }
}

function initItem(a) {
    var c, d, e, f, g, h, i, j, l, m, n, o, p, b = $$tag("input", a);
    for (0 == b.length && (b = $$tag("textarea", a)), c = 0; c < b.length; c++) b[c].parent = a, a.isShop ? (d = getPreviousNode(b[c]), d.rel = b[c], e = getNextNode(b[c]), e.rel = b[c], e.onclick = function () {
        var e, a = parseInt(this.rel.value), b = !1, c = 0, d = this.rel.getAttribute("num");
        d && (b = !0, c = parseInt(d)), b && a >= c ? (e = "库存只剩" + c + "件，不能再增加！", 0 >= c && (e = "已售完，无法添加"), popUpAlert(e)) : (this.rel.value = a + 1, updateCart())
    }, d.onclick = function () {
        var a = parseInt(this.rel.value);
        1 > a || (this.rel.value = a - 1, updateCart())
    }, b[c].onchange = b[c].onblur = function () {
        (!isInt(this.value) || this.value - 1 < 0) && (this.value = 0), updateCart()
    }) : (b[c].onclick || (b[c].onclick = itemClick), "TEXTAREA" == b[c].tagName && (b[c].onchange = b[c].onblur = itemClick), f = b[c].getAttribute("rel"), f && (g = null, "psibling" == f ? (g = getPreviousNode(b[c]), b[c].onclick = itemClick) : g = document.getElementById(f), g.itemText = b[c], b[c].choiceRel = g, b[c].onblur = fcInputboxBlur, a.dataNode && a.dataNode._referedTopics && (b[c].onchange = itemClick), b[c].value || (b[c].value = defaultOtherText), b[c].style.color = "#999999", h = b[c].getAttribute("req"), g.req = "true" == h ? !0 : !1), i = "", !a.dataNode || "radio" != a.dataNode._type && "check" != a.dataNode._type || (i = b[c].getAttribute("rimg"), i && (j = document.getElementById(i), j && (j.onclick = function () {
        var c, b = this.getAttribute("irel");
        b && (c = document.getElementById(b), c.parentNode.onclick())
    }))), l = !(!a.dataNode || "radio" != a.dataNode._type && "check" != a.dataNode._type || a.dataNode.isSort || a.dataNode.isRate && "101" != a.dataNode._mode), a.isTrap || l ? (m = b[c].nextSibling, b[c].choiceRel ? (g = getPreviousNode(b[c]), g && (g.tagName && "label" == g.tagName.toLowerCase() && (g.style.display = "inline-block"), b[c].style.position = "static")) : null != m && (n = b[c].parentNode, i || (n.onmouseover = function () {
        this.style.background = "#efefef"
    }, n.onmouseout = function () {
        this.style.background = ""
    }), b[c].checked && "radio" == b[c].type && (o = getPreviousNode(b[c]), o && "a" == o.tagName.toLowerCase() && (a.prevARadio = o)), n.onclick = function () {
        var d, e, f, g, c = this.getElementsByTagName("a")[0];
        c && (a.hasConfirm || (d = c.getAttribute("rel"), d && (e = document.getElementById(d), e.disabled || (f = "radio" == e.type, f ? (c.className = "jqRadio jqChecked", e.checked = !0) : (e.checked = !e.checked, c.className = e.checked ? "jqCheckbox jqChecked" : "jqCheckbox"), g = null, e.parent && (g = e.parent.parent || e.parent), itemClick.call(e), f && (g && g.prevARadio && g.prevARadio != c && (g.prevARadio.className = "jqRadio"), g.prevARadio = c)))))
    })) : "TR" != a.tagName || "radio" != b[c].type && "checkbox" != b[c].type || (p = b[c].parentNode, p.style.cursor = "pointer", hasJoin && b[c].checked && "radio" == b[c].type && (o = getPreviousNode(b[c]), o && "a" == o.tagName.toLowerCase() && b[c].parent && (b[c].parent.prevARadio = o)), p.onclick = function (a) {
        var e, b = this.getElementsByTagName("input"), c = b[0], d = getPreviousNode(c);
        "checkbox" == c.type ? (c.checked = !c.checked, c.onclick(), d && (d.className = c.checked ? "jqCheckbox jqChecked" : "jqCheckbox"), stopPropa(a)) : CheckMax(this, c) && (d && (d.className = "jqRadio jqChecked", e = c.parent, e.prevARadio && e.prevARadio != d && (e.prevARadio.className = "jqRadio"), e.prevARadio = d), c.checked = !0, c.onclick(), stopPropa(a))
    }, p.onmouseover = function () {
        this.style.background = "#efefef"
    }, p.onmouseout = function () {
        this.style.background = ""
    }));
    b.length > 0 && (a.itemInputs = b)
}

function initLikertItem(a) {
    var e, f, b = $$tag("li", a), c = new Array;
    for (j = 0; j < b.length; j++) f = b[j].className.toLowerCase(), b[j].className && (f.indexOf("off") > -1 || f.indexOf("on") > -1) && (b[j].onclick = itemLiClick, b[j].onmouseover = itemMouseOver, b[j].onmouseout = itemMouseOut, b[j].parent = a, c.push(b[j]), f.indexOf("on") > -1 ? e = b[j] : f.indexOf("off") > -1 && e && (e.parent.holder = e.value));
    b.length > 0 && (e && (e.parent.holder = e.value), a.itemLis = c)
}

function referTitle(a, b) {
    var d, e, f, g, h, i, c = a.dataNode;
    if (c._titleTopic) {
        if (d = "", void 0 == b && a.itemInputs) for (e = 0; e < a.itemInputs.length; e++) a.itemInputs[e].checked && (f = getNextNode(a.itemInputs[e]), c.isSort && (f = a.itemInputs[e].parentNode.getElementsByTagName("label")[0]), d && (d += "&nbsp;"), d += f.innerHTML); else d = b || "";
        for (g = 0; g < c._titleTopic.length; g++) h = c._titleTopic[g], i = document.getElementById("spanTitleTopic" + h), i && (i.innerHTML = d)
    }
}

function getparentNode(a, b) {
    for (; a.parentNode.tagName.toLowerCase() != b;) a = a.parentNode;
    return a.parentNode
}

function createItem(a) {
    var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, b = a.dataNode,
        c = b._referedTopics.split(","), d = new Array;
    for (e = 0; e < a.itemInputs.length; e++) a.itemInputs[e].checked && d.push(a.itemInputs[e]);
    for (e = 0; e < c.length; e++) if (f = c[e], g = questionsObject[f], g && (h = !1, i = document.getElementById("divRef" + f))) {
        switch (j = 0, k = [], l = new Object, m = null, n = document.getElementById("lbl" + b._topic + "_1") ? !0 : !1, g.dataNode._type) {
            case"matrix":
            case"sum":
                if (window.cepingCandidate) continue;
                for (o = g.dataNode._mode, p = 0; p < a.itemInputs.length; p++) if (q = a.itemInputs[p], q.value && "checkbox" == q.type) {
                    if (r = parseInt(q.value) - 1 + j, !g.itemTrs[r]) break;
                    g.itemTrs[r].style.display = q.checked ? "" : "none", q.checked && !g.itemTrs[r].hasInit && "matrix" == g.dataNode._type && (g.itemTrs[r].hasInit = !0, o && 0 > o - 100 ? initLikertItem(g.itemTrs[r]) : initItem(g.itemTrs[r])), q.checked && (h = !0, q.itemText && (s = q.itemText.value, t = g.itemTrs[r].getElementsByTagName("th")[0], t && (t.span || (t.span = document.createElement("span"), t.appendChild(t.span)), t.span.innerHTML = s && s != defaultOtherText ? "[<span style='color:red;'>" + s + "</span>]" : ""))), hasJoin && g.itemTrs[r].divSlider && (u = g.itemTrs[r].divSlider.getAttribute("defvalue"), u && isInt(u) && g.itemTrs[r].sliderImage.setValue(parseInt(u))), n && (v = g.itemTrs[r].getAttribute("group"), v && (m = v, k.push(v)), m && q.checked && !l[m] && (l[m] = "1"))
                }
                1 == j && (g.itemTrs[0].style.display = h ? "" : "none"), i.style.display = h ? "none" : "", g.displayContent = h, g.referDiv = a;
                break;
            case"radio":
            case"check":
                for (w = g.itemInputs, x = new Object, p = 0; p < a.itemInputs.length; p++) q = a.itemInputs[p], q.checked && (x[q.value] = q);
                for (p = 0; p < w.length; p++) q = w[p], ("checkbox" == q.type || "radio" == q.type) && (y = x[q.value], z = q.parentNode, "li" != z.tagName.toLowerCase() && (z = getparentNode(z, "li")), y ? (z.style.display = "", h = !0, y.itemText && q.itemText && (q.itemText.value = y.itemText.value)) : z.style.display = "none", n && (v = z.getAttribute("group"), v && (m = v, k.push(v)), m && y && !l[m] && (l[m] = "1")));
                i.style.display = h ? "none" : "", g.displayContent = h
        }
        if (n) for (A = 0; A < k.length; A++) v = k[A], B = l[v], C = "lbl" + f + "_" + v, D = document.getElementById(C), D && (D.style.display = B ? "" : "none")
    }
}

function divMatrixItemClick() {
    var a, b;
    if (curMatrixItem != this) {
        if (null != curMatrixItem && (curMatrixItem.style.background = curMatrixItem.prevBackColor || "", curMatrixItem.daoZhi)) for (itemInputs = curMatrixItem.itemInputs, a = 0; a < itemInputs.length; a++) itemInputs[a].parentNode.style.background = "";
        curMatrixItem = this, this.parent && (b = this.parent.dataNode, updateProgressBar(b))
    }
}

function divQuestionClick() {
    curdiv != this && (showLeftBar(), curdiv = this, null != curMatrixItem && curMatrixItem.parent != curdiv && (curMatrixItem.style.background = curMatrixItem.prevBackColor || ""), null != curMatrixItem && curMatrixItem.parent == curdiv && (this.style.background = ""), this.removeError && this.removeError(), completeLoaded || (curdiv = null), this.itemTextarea && curdiv.parentNode && "none" != curdiv.parentNode.style.display && this.itemTextarea.focus())
}

function showLeftBar() {
    window.divLeftBar && !hasDisplayed && (hasDisplayed = !0, divProgressImg && (divProgressImg.style.visibility = "visible", document.getElementById("loadprogress").style.visibility = "visible"), divSave && (divSave.parentNode.style.visibility = "visible", divSave.parentNode.style.marginTop = "5px"), divLeftBar.style.background = "#ffffff")
}

function updateProgressBar(a) {
    var b = a._topic;
    b > MaxTopic && (MaxTopic = b), progressArray[b] || (joinedTopic++, progressArray[b] = !0, showProgressBar(a)), setTimeout(function () {
        postHeight()
    }, 500)
}

function showProgressBar(a) {
    var b, c, d, e;
    window.divProgressImg && (loadcss || (loadcss = document.getElementById("loadcss")), loadprogress || (loadprogress = document.getElementById("loadprogress")), b = totalQ, c = joinedTopic, 2 == progressBarType && (b = totalPage, c = cur_page + 1), d = 100 * (parseFloat(c) / b), d = d || 0, d >= 70 && a && a._topic == totalQ && (d = 100), e = d + "%", loadcss.style.height = e, loadprogress.innerHTML = 1 == progressBarType ? "&nbsp;&nbsp;" + d.toFixed(0) + "%" : "&nbsp;" + c + "/" + b + page_info, hrefSave && spanSave && clearInterval(saveInterval))
}

function checkMinMax(a, b, c) {
    var d, e, f, g, h;
    if (b._maxValue > 0 || b._minValue > 0) {
        for (d = c.itemInputs, e = 0, f = 0; f < d.length; f++) d[f].checked && e++;
        c.parent && (c = c.parent), c.divChecktip || (c.divChecktip = document.createElement("div"), c.appendChild(c.divChecktip), c.divChecktip.style.color = "#666"), g = "&nbsp;&nbsp;&nbsp;您已经选择了" + e + "项", b._maxValue > 0 && e > b._maxValue ? (0 == langVer && popUpAlert("此题最多只能选择" + b._maxValue + "项"), a.checked = !1, a.onclick && a.onclick(), h = getPreviousNode(a), h && "a" == h.tagName.toLowerCase() && (h.className = "jqCheckbox"), a.checked = !1, e--, g = "&nbsp;&nbsp;&nbsp;您已经选择了" + e + "项") : b._minValue > 0 && e < b._minValue && (g += ",<span style='color:red;'>少选择了" + (b._minValue - e) + "项</span>", a.checked && b._select[a.value - 1] && b._select[a.value - 1]._item_huchi && (g = "")), 0 == langVer && (c.divChecktip.innerHTML = g)
    }
    return !1
}

function itemSortClick() {
    var c, d, e, f, g, h, i, j, a = this.getElementsByTagName("input")[0], b = a.parent.parent || a.parent;
    if (hasAnswer = !0, c = b.dataNode, updateProgressBar(c), d = a.checked, e = this.parentNode.getElementsByTagName("li"), f = this.getElementsByTagName("span")[0], d) {
        for (g = f.innerHTML, h = 0; h < e.length; h++) e[h].getElementsByTagName("input")[0].checked && (i = e[h].getElementsByTagName("span")[0], j = i.innerHTML, j - g > 0 && (i.innerHTML = j - 1));
        f.innerHTML = "", f.className = "sortnum", a.checked = !1
    } else {
        for (g = 1, h = 0; h < e.length; h++) e[h].getElementsByTagName("input")[0].checked && g++;
        f.innerHTML = g, f.className = "sortnum sortnum-sel", a.checked = !0
    }
    c._referedTopics && createItem(b), referTitle(b), displayRelationRaidoCheck(b, c), this.inputLi = a, checkMinMax(this, c, b), jump(b, this)
}

function checkMatrixMaxValue(a, b) {
    var c, d, e;
    if (b && b.dataNode._maxvalue) {
        for (c = a.parentNode.parentNode.getElementsByTagName("input"), d = 0, e = 0; e < c.length; e++) c[e].checked && d++;
        if (d - b.dataNode._maxvalue > 0) return a.checked = !1, !0
    }
    return !1
}

function stopPropa(a) {
    a = a || window.event, a && (a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0)
}

function itemClick(a) {
    var b, c, d, e, f, g, h, i, j, k;
    if (this.parent && (showLeftBar(), b = this.parent.parent || this.parent, !b.isTrap && !b.hasConfirm)) {
        if (hasAnswer = !0, c = b.dataNode, updateProgressBar(c), this.itemText && this.itemText.onclick && (this.checked ? this.itemText.onclick() : this.itemText.onblur && this.itemText.onblur()), "checkbox" == this.type) checkHuChi(b, this), this.itemText && (this.checked ? this.itemText.value = this.itemText.pvalue || "" : (this.itemText.pvalue = this.itemText.value, this.itemText.value = "")), c._referedTopics && createItem(b), referTitle(b), showAnswer(b), displayRelationRaidoCheck(b, c), checkMinMax(this, c, b), jump(b, this), "matrix" == c._type && (checkMatrixMaxValue(this, b), divMatrixRel.style.display = "none", d = this.getAttribute("needfill"), d && this.checked && showMatrixFill(this), b.removeError && b.removeError(), stopPropa(a)); else if ("radio" == this.type || "slider" == c._type || "matrix" == c._type && "201" != c._mode && "301" != c._mode && "302" != c._mode) c._requir || b.hasClearHref || addClearHref(b), "radio" == this.type && ("matrix" == c._type ? (processRadioInput(this.parentNode.parentNode, this), divMatrixRel.style.display = "none", d = this.getAttribute("needfill"), d && showMatrixFill(this), b.removeError && b.removeError()) : processRadioInput(b, this), referTitle(b), showAnswer(b)), displayRelationRaidoCheck(b, c), jump(b, this), (0 == popUpindex && "matrix" == c._type || "matrix" != c._type && 0 == itempopUpindex && c._mode && "0" != c._mode) && processSamecount(b, this); else if ("matrix" == c._type && "201" == c._mode) {
            for (e = b.itemTrs, f = 0, h = 0; h < e.length; h++) if ("none" != e[h].style.display) {
                if (f = validateMatrix(c, e[h], e[h].itemInputs[0]), f && !g) {
                    g = e[h].itemInputs[0];
                    break
                }
                txtChange(e[h], e[h].itemInputs[0])
            }
            if (b.removeError && b.removeError(), g && (b.errorControl = g, validate_ok = writeError(b, verifyMsg, 3e3)), b.dataNode._hasjump) {
                for (i = !1, h = 0; h < e.length; h++) if (j = e[h].itemInputs[0], "" != trim(j.value)) {
                    i = !0;
                    break
                }
                jumpAny(i, b)
            }
            stopPropa(a)
        } else if ("sum" == c._type) this.parent.sliderImage ? sumClick(b, this.parent.sliderImage.sliderValue) : sumClick(b, this); else if ("text" == this.type) processTextR(this, b, c), stopPropa(a); else if ("SELECT" == this.nodeName) {
            if ("check" == c._type) return;
            b.focus(), jump(b, this), displayRelationDropDown(b, c), k = this.options[this.selectedIndex].text, -2 == this.value && (k = ""), referTitle(b, k)
        }
        postHeight()
    }
}

function showAnswer(a) {
    if (window.isChuangGuan && "1" == a.getAttribute("ceshi") && !a.confirmButton) {
        var b = document.createElement("a");
        b.style.margin = "10px 0 0 20px", b.className = "sumitbutton cancle", a.insertBefore(b, a.lastChild), a.confirmButton = b, b.innerHTML = "确认", b.onclick = function () {
            var b, c, d, e, f, g, h, i, j, k;
            if (hasConfirmBtn || (maxCheatTimes > 0 && (fireConfirm = !0), confirm("确认后答案将无法修改，确认吗？"))) {
                for (a.hasConfirm = !0, hasConfirmBtn = !0, b = !0, c = "", d = a.itemInputs, e = 0; e < d.length; e++) f = "1" == d[e].getAttribute("ans"), f ? (d[e].checked || (b = !1), g = getNextNode(d[e]), h = "", g && (h = g.innerHTML), /^[A-Z][\.、．\s]/.test(h) && (h = h.substring(0, 1)), c && (c += ","), c += h) : d[e].checked && (b = !1), g = getNextNode(d[e]), "label" == g.tagName.toLowerCase() && g.removeAttribute("for");
                a.correctAnswer || (i = document.createElement("div"), i.style.margin = "10px 0 0 20px", i.style.fontSize = "16px", a.insertBefore(i, a.lastChild), a.correctAnswer = i), j = b ? "<span style='color:green;'>回答正确</span>" : "<span style='color:red;'>回答错误，正确答案为：" + c + "</span>", a.correctAnswer.innerHTML = j, k = document.getElementById("divjx" + a.id.replace("div", "")), k && (k.style.display = "")
            }
        }
    }
}

function processSamecount(a, b) {
    var c, d, e, f, g, h, i, j, k, l;
    if (window.IsSampleService && "t" == promoteSource) if (c = a.dataNode, "matrix" == c._type) {
        for (d = b.value, e = a.getElementsByTagName("input"), f = 0, g = 0; g < e.length; g++) if (e[g].checked && e[g].value == d && f++, f > 4) {
            popUpindex++, popUpAlert("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核");
            break
        }
    } else for (h = c._mode, d = b.value, i = parseInt(a.id.replace("div", "")) - 1, f = 0, g = i; g >= 1 && (j = document.getElementById("div" + g), k = j.dataNode, "radio" == k._type && k._mode == h); g--) {
        if (e = j.getElementsByTagName("input"), e.length > 0) {
            for (l = 0; l < e.length; l++) if (e[l].checked && e[l].value == d) {
                f++;
                break
            }
        } else e = j.getElementsByTagName("li"), e[d].className.toLowerCase().indexOf("on") > -1 && !e[d + 1].className.toLowerCase().indexOf("on") > -1 && f++;
        if (f > 3) {
            itempopUpindex++, popUpAlert("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核"), stopPropa();
            break
        }
    }
}

function processRadioInput(a, b) {
    a.prevRadio && a.prevRadio.itemText && a.prevRadio != b && (a.prevRadio.itemText.pvalue = a.prevRadio.itemText.value, a.prevRadio.itemText.value = ""), b.itemText && b != a.prevRadio && (b.itemText.value = b.itemText.pvalue || ""), a.prevRadio = b
}

function processTextR(a, b, c) {
    var d, e;
    if (a.choiceRel) if (a.value == defaultOtherText && (a.value = ""), 1 == c._mode && "checkbox" == a.choiceRel.type) a.choiceRel.checked || a.parentNode.click(); else {
        if (a.choiceRel.checked = !0, "matrix" == c._type && "102" == c._mode && (d = checkMatrixMaxValue(a.choiceRel, b))) return a.blur && a.blur(), void 0;
        a.style.color = "#000000", a.style.background = "", c._referedTopics && createItem(b), "checkbox" == a.choiceRel.type ? (a.pvalue && !a.value && (a.value = a.pvalue), e = getPreviousNode(a.choiceRel), e && "a" == e.tagName.toLowerCase() && (e.className = "jqCheckbox jqChecked"), checkHuChi(b, a.choiceRel), checkMinMax(a.choiceRel, c, b)) : "radio" == a.choiceRel.type && ("matrix" == c._type ? processRadioInput(a.parentNode.parentNode, a.choiceRel) : (e = getPreviousNode(a.choiceRel), e && "a" == e.tagName.toLowerCase() && (e.className = "jqRadio jqChecked", b && b.prevARadio && b.prevARadio != e && (b.prevARadio.className = "jqRadio"), b.prevARadio = e), processRadioInput(b, a.choiceRel))), displayRelationRaidoCheck(b, c), jump(b, a.choiceRel)
    }
}

function checkHuChi(a, b) {
    var c, d, e, f, g;
    if (b.checked && (c = a.dataNode, c.hasHuChi)) for (d = a.itemInputs, e = c._select[b.value - 1]._item_huchi, f = 0; f < d.length; f++) "checkbox" == d[f].type && d[f] != b && d[f].checked && (e ? (d[f].parentNode.onclick && d[f].parentNode.onclick(), d[f].checked = !1) : (g = c._select[d[f].value - 1]._item_huchi, g && (d[f].parentNode.onclick && d[f].parentNode.onclick(), d[f].checked = !1)))
}

function relationJoin(a) {
    var b, c;
    "none" != a.style.display && (b = a.dataNode, c = b._type, "radio" == c || "check" == c ? displayRelationRaidoCheck(a, b) : "radio_down" == c && displayRelationDropDown(a, b))
}

function displayRelationRaidoCheck(a, b) {
    var d, e, f, g, h, i, j, c = b._topic;
    if (relationQs[c]) {
        if (a.hasDisplayByRelation = new Object, d = -1, a.itemLis) {
            for (e = a.itemLis, f = 0; f < e.length; f++) e[f].className.indexOf("on") > -1 && (d = f + 1);
            for (f = 0; f < e.length; f++) g = !1, h = e[f].value, i = c + "," + h, d > -1 && h == d && (g = !0), displayByRelation(a, i, g)
        } else for (e = a.itemInputs, f = 0; f < e.length; f++) g = !1, h = e[f].value, i = c + "," + h, e[f].checked && (g = !0), displayByRelation(a, i, g), j = c + ",-" + h, -1 != relationGroup.indexOf(a.dataNode._topic) && (relationGroupHT[j] || relationGroupHT[j.replace(",", ",-")], displayByRelation(a, j, g, !0)), displayByRelationNotSelect(a, j, g, e);
        loopJoinProgressQ(c)
    }
}

function loopJoinProgressQ(a, b) {
    var c, d, e;
    if (relationQs[a]) for (c = 0; c < relationQs[a].length; c++) d = relationQs[a][c], d.dataNode && (e = d.dataNode._topic, "none" != d.style.display || progressArray[e] || (progressArray[e] = "jump", joinedTopic++), loopJoinProgressQ(e, b))
}

function displayRelationDropDown(a, b) {
    var d, e, f, g, h, i, c = b._topic;
    if (relationQs[c]) {
        for (d = a.itemSel, e = a.itemSel.value, a.hasDisplayByRelation = new Object, f = 0; f < d.length; f++) g = !1, h = d[f].value, i = c + "," + h, h == e && (g = !0), displayByRelation(a, i, g);
        loopJoinProgressQ(c)
    }
}

function checkDisplay(a) {
    var c, d, e, f, g, h, i, j, k, m, b = !1;
    for (c in a) for (d = 0; d < a[c].length; d++) {
        if (e = a[c][d].replace("-", ""), f = a[c][d].replace("q", "").split("_"), g = document.getElementById(e), h = document.getElementById("q" + f[0]), i = document.getElementById("div" + f[0]), g && f[1] > 0 == g.checked) {
            b = !0;
            break
        }
        if (!g && h && f[1] == h.value) {
            b = !0;
            break
        }
        if (!g && i && (j = i.itemInputs || i.itemLis)) {
            for (k = -1, m = 0; m < j.length; m++) j[m].className && j[m].className.toLowerCase().indexOf("on") > -1 && (k = m + 1);
            if (f[1] == k) {
                b = !0;
                break
            }
        }
    }
    return b
}

function displayByRelation(a, b, c, d) {
    var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, E, F, G, H, I, J, e = a.dataNode._topic;
    if (-1 != relationGroup.indexOf(e) && (f = "", g = relationGroupHT[b] || relationGroupHT[b.replace(",", ",-")])) for (h = 0; h < g.length; h++) {
        i = new Object, j = "", j = g[h].dataNode ? g[h].dataNode._topic : g[h].getAttribute("topic"), k = g[h].getAttribute("relation"), k && (f = -1 != k.indexOf("|") ? "|" : "$");
        for (l in relationGroupHT) for (m = 0; m < relationGroupHT[l].length; m++) n = "", n = relationGroupHT[l][m].dataNode ? relationGroupHT[l][m].dataNode._topic : relationGroupHT[l][m].getAttribute("topic"), j == n && (o = l.split(",")[0], i[o] || (i[o] = new Array), i[o].push("q" + l.replace(",", "_")));
        if (p = !1, "$" == f) p = checkDisplay(i); else {
            p = !0;
            for (q in i) {
                for (r = !1, m = 0; m < i[q].length; m++) {
                    if (s = i[q][m].replace("-", ""), t = i[q][m].replace("q", "").split("_"), u = document.getElementById(s), v = document.getElementById("q" + t[0]), w = document.getElementById("div" + t[0]), x = !1, y = null, t[1] < 0 && u && (y = u.parentNode.parentNode), t[1] < 0 && u && u.getAttribute("rimg") && (y = y.parentNode.parentNode), t[1] < 0 && u && "ul" == y.tagName.toLowerCase()) for (z = y.getElementsByTagName("input"), A = 0; A < z.length; A++) z[A].checked && (x = !0);
                    if (u && t[1] > 0 == u.checked) {
                        if (r = !0, !(t[1] < 0) || x) break;
                        r = !1
                    } else {
                        if (!u && v && t[1] == v.value) {
                            r = !0;
                            break
                        }
                        if (!u && w && (B = w.itemInputs || w.itemLis)) {
                            for (C = -1, E = 0; E < B.length; E++) B[E].className && B[E].className.toLowerCase().indexOf("on") > -1 && (C = E + 1);
                            if (t[1] == C) {
                                r = !0;
                                break
                            }
                        }
                    }
                }
                if (!r) {
                    p = !1;
                    break
                }
            }
        }
        F = questionsObject[j], F ? (F.style.display = p ? "" : "none", p ? "jump" == progressArray[j] && (progressArray[j] = !1, joinedTopic--) : loopHideRelation(F)) : (G = document.getElementById("divCut" + j.replace("c", "")), G && (G.style.display = p ? "" : "none"))
    }
    if (H = relationHT[b]) for (I = 0; I < H.length; I++) J = "", J = H[I].dataNode ? H[I].dataNode._topic : H[I].getAttribute("topic"), a.hasDisplayByRelation[J] || (c || "none" == H[I].style.display ? c && (H[I].style.display = "", "1" == H[I].getAttribute("isshop") && updateCart(H[I]), "1" == H[I].getAttribute("qingjing") && displayRelationRaidoCheck(H[I], H[I].dataNode), d || (a.hasDisplayByRelation[J] = "1"), "jump" == progressArray[J] && (progressArray[J] = !1, joinedTopic--), relationNotDisplayQ[J] && (relationNotDisplayQ[J] = "")) : loopHideRelation(H[I]))
}

function displayByRelationNotSelect(a, b, c, d) {
    var f, g, h, i, j, k, l, m, n, o, p, e = relationHT[b];
    if (e) for (f = 0; f < e.length; f++) if (g = c, h = "", h = e[f].dataNode ? e[f].dataNode._topic : e[f].getAttribute("topic"), !a.hasDisplayByRelation[h]) {
        if (i = e[f].getAttribute("relation"), i.indexOf(";") > -1 && (j = !1, k = i.split(","), 2 == k.length)) {
            for (l = k[1].split(";"), m = new Object, n = 0; n < l.length; n++) o = l[n].replace("-", ""), m[o] = "1";
            for (n = 0; n < d.length; n++) if (p = d[n].value, m[p] && d[n].checked) {
                j = !0;
                break
            }
            g = j ? !0 : !1
        }
        g && "none" != e[f].style.display ? loopHideRelation(e[f]) : g || (e[f].style.display = "", a.hasDisplayByRelation[h] = "1", "jump" == progressArray[h] && (progressArray[h] = !1, joinedTopic--), relationNotDisplayQ[h] && (relationNotDisplayQ[h] = ""))
    }
}

function loopHideRelation(a) {
    var c, d, e, f, g, h, i, j, k, l, b = "";
    if (b = a.dataNode ? a.dataNode._topic : a.getAttribute("topic"), c = relationQs[b]) for (d = 0; d < c.length; d++) loopHideRelation(c[d], !1);
    if (clearAllOption(a), e = !0, f = a.getAttribute("relation"), f && "0" != f && -1 != f.indexOf("$")) {
        g = new Object;
        for (h in relationGroupHT) for (i = 0; i < relationGroupHT[h].length; i++) j = "", j = relationGroupHT[h][i].dataNode ? relationGroupHT[h][i].dataNode._topic : relationGroupHT[h][i].getAttribute("topic"), b == j && (k = h.split(",")[0], g[k] || (g[k] = new Array), g[k].push("q" + h.replace(",", "_")));
        l = checkDisplay(g), l && (e = !1)
    }
    e && (a.style.display = "none", "1" == a.getAttribute("isshop") && updateCart(a), "" == relationNotDisplayQ[b] && (relationNotDisplayQ[b] = "1"))
}

function sumClick(a, b, c) {
    var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, d = a.getElementsByTagName("input"), e = a.dataNode;
    if (updateProgressBar(e), d) {
        for (f = d.length, g = e._total, h = g, i = 0, l = b.value, parseInt(l) < 0 && (b.value = ""), m = new Array, n = 0; f > n; n++) o = d[n].value, p = a.itemTrs[n], q = p.sliderImage, "none" != p.style.display ? (j = d[n], k = q, d[n].sIndex = n, m.push(d[n]), o && trim(o) ? isInt(o) ? (h -= parseInt(o), void 0 == q._value ? q.setValue(parseInt(l), !0) : c && d[n] == b && q.setValue(parseInt(l), !0)) : (d[n].value = "", i++) : "none" == p.style.display || i++) : (o = "", d[n].value = "");
        if (1 == i && h >= 0 && (k.setValue(h, !0), j.value = h, h = 0), r = "", 0 == i && 0 != h && (s = parseInt(j.value) + h, s >= 0 ? j != b ? (k.setValue(s, !0), j.value = s, h = 0) : 2 == m.length && (t = g - parseInt(j.value), u = m[0].sIndex, a.itemTrs[u].sliderImage.setValue(t), m[0].value = t, h = 0) : r = "，<span style='color:red;'>" + sum_warn + "</span>"), 0 == h) for (n = 0; f > n; n++) d[n].value || (d[n].value = "0");
        a.sumLeft = h, a.relSum && (a.relSum.innerHTML = sum_total + "<b>" + g + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g - h) + "</span>" + r), jump(a, this)
    }
}

function jump(a, b) {
    var c = a.dataNode, d = c._anytimejumpto, e = c._hasjump, f = c._referTopic;
    e && !f && (d > 0 ? jumpAnyChoice(a) : 0 == d && "radio" != c._type && "radio_down" != c._type ? jumpAnyChoice(a) : jumpByChoice(a, b))
}

function jumpAnyChoice(a, b) {
    var e, f, c = a.itemInputs || a.itemLis || a.itemTrs || a.gapFills, d = !1;
    if (c) for (e = 0; e < c.length; e++) {
        if (c[e].checked) d = !0; else if (c[e].className.indexOf("on") > -1) d = !0; else if (c[e].divSlider && c[e].divSlider.value) d = !0; else if ("TEXTAREA" == c[e].tagName && "" != trim(c[e].value)) d = !0; else if ("text" == c[e].type && "" != trim(c[e].value)) d = !0; else if (c[e].itemSels) for (f = 0; f < c[e].itemSels.length; f++) if (c[e].itemSels[f]) {
            d = !0;
            break
        }
        if (d) break
    } else a.itemSel ? d = a.itemSel.selectedIndex > 0 ? !0 : !1 : a.divSlider ? d = void 0 != a.divSlider.value && null != a.divSlider.value ? !0 : !1 : a.itemTextarea ? d = "" != trim(a.itemTextarea.value) : a.uploadFrame && (d = a.fileName ? !0 : !1);
    jumpAny(d, a, b)
}

function jumpByChoice(a, b) {
    var d, c = a.dataNode;
    "-2" == b.value ? processJ(a.indexInPage - 0, 0) : "-1" == b.value || "" == b.value ? processJ(a.indexInPage - 0, 0) : "radio" != c._type && "radio_down" != c._type || parseInt(b.value) != b.value || (d = c._select[b.value - 1]._item_jump, processJ(a.indexInPage - 0, d - 0))
}

function txtChange(a, b) {
    var d, e, f, g, h, i, j, k, l, m, n, c = a.parent.parent || a.parent;
    updateProgressBar(c.dataNode), hasAnswer = !0, c.removeError && c.removeError(), d = c.dataNode._verify, e = c.dataNode._needOnly || a.getAttribute("needonly"), f = a.value, !f && b && b.value && (f = b.value), f || (f = ""), f = trim(f), e && "" != f && "地图" != d && b && "3" != hasJoin && (g = getXmlHttp(), g.onreadystatechange = function () {
        4 == g.readyState && 200 == g.status && ("false1" == unescape(g.responseText) ? (a.isOnly = !1, c.verifycodeinput && (c.verifycodeinput.parentNode.style.display = "none"), writeError(c, validate_only, 3e3)) : a.isOnly = !0)
    }, h = c.dataNode._topic, i = a.getAttribute("gapindex"), i && (h = 1e4 * parseInt(h) + parseInt(i)), g.open("get", "/joinnew/AnswerOnlyHandler.ashx?q=" + activityId + "&at=" + encodeURIComponent(f) + "&qI=" + h + "&o=true&t=" + (new Date).valueOf()), g.send(null)), ("matrix" != c.dataNode._type || "201" != c.dataNode._mode) && ("matrix" == c.dataNode._type && "303" == c.dataNode._mode && (d = "数字"), "" != f && d && "0" != d && (c.removeError && c.removeError(), j = c.dataNode, k = c.getAttribute("issample"), l = !0, k && "t" != promoteSource && (l = !1), l && (m = verifyMinMax(a, d, j._minword, j._maxword), "" != m && (validate_ok = writeError(c, m, 3e3)), "密码" == d && a && a.firstPwd && (d = "确认密码"), m = verifydata(a, d, c.dataNode), "" != m && (validate_ok = writeError(c, m, 3e3)))), "gapfill" == c.dataNode._type && (n = 0, n = validateMatrix(c.dataNode, a, a), n && (c.errorControl = a, writeError(c, verifyMsg, 3e3))), "sum" == c.dataNode._type ? sumClick(c, a, 1) : jumpAny("" != f, c))
}

function jumpAny(a, b, c) {
    var d = b.dataNode;
    d._hasjump && (a ? processJ(b.indexInPage - 0, d._anytimejumpto - 0, c) : processJ(b.indexInPage - 0, 0, c))
}

function processJ(a, b, c) {
    var h, i, j, k, m, n, d = a + 1, e = cur_page, f = 1 == b || -1 == b, g = 0;
    for (h = cur_page; h < pageHolder.length; h++) {
        for (i = pageHolder[h].questions, f && (e = h), !g && i[a] && i[a].dataNode && (g = parseInt(i[a].dataNode._topic)), j = d; j < i.length; j++) k = i[j].dataNode._topic, (k == b || f) && (e = h), "1" != i[j].getAttribute("nhide") && (b > k || f ? (i[j].style.display = "none", progressArray[k] || (joinedTopic++, progressArray[k] = "jump")) : (relationNotDisplayQ[k] || (i[j].style.display = ""), "jump" == progressArray[k] && (joinedTopic--, progressArray[k] = !1), i[j].dataNode._hasjump && !c && clearAllOption(i[j])));
        for (j = 0; j < pageHolder[h].cuts.length; j++) m = pageHolder[h].cuts[j], k = m.getAttribute("qtopic"), k && (g && g >= k || d >= k || (b > k || f ? m.style.display = "none" : (n = m.getAttribute("topic"), relationNotDisplayQ[n] || (m.style.display = ""))));
        d = 0
    }
    1 == b && (joinedTopic = totalQ), showProgressBar()
}

function addClearHref(a) {
    if (!window.isKaoShi) {
        a.dataNode;
        var c = document.createElement("a");
        c.title = validate_info_submit_title2, c.className = "link-999", c.style.marginLeft = "25px", c.innerHTML = "[" + type_radio_clear + "]", c.href = "javascript:void(0);", a.hasClearHref = !0, a.divTitle.appendChild(c), a.clearHref = c, c.onclick = function () {
            clearAllOption(a), referTitle(a), jumpAny(!1, a)
        }
    }
}

function clearAllOption(a) {
    var c, d, e, f, g, b = a.itemSel;
    if (b && (b.selectedIndex = 0), a.divSlider && void 0 != a.divSlider.value && (a.sliderImage.setValue(a.dataNode._minvalue, !0), a.divSlider.value = void 0), c = a.itemInputs || a.itemLis || a.itemTrs, c && "1" != a.getAttribute("qingjing")) {
        for (a.hasClearHref = !1, a.clearHref && (a.clearHref.parentNode.removeChild(a.clearHref), a.clearHref = null), d = 0; d < c.length; d++) if (c[d].checked) c[d].checked = !1, e = getPreviousNode(c[d]), e && "a" == e.tagName.toLowerCase() && (e.className = e.className.replace("jqChecked", "")); else if (0 == c[d].className.toLowerCase().indexOf("on")) c[d].className = "off" + a.dataNode._mode; else if (c[d].parent && c[d].parent.holder) c[d].parent.holder = 0; else if (c[d].divSlider && c[d].divSlider.value) c[d].sliderImage.setValue(a.dataNode._minvalue, !0), c[d].divSlider.value = void 0; else if (f = c[d].itemInputs || c[d].itemLis) for (g = 0; g < f.length; g++) f[g].checked ? (f[g].checked = !1, e = getPreviousNode(f[g]), e && "a" == e.tagName.toLowerCase() && (e.className = e.className.replace("jqChecked", ""))) : 0 == f[g].className.toLowerCase().indexOf("on") ? f[g].className = "off" + a.dataNode._mode : f[g].parent && f[g].parent.holder && (f[g].parent.holder = 0);
        a.holder && (a.holder = 0)
    }
}

function itemMouseOver() {
    var b, c, d, a = this.parent.parent || this.parent;
    if (a.dataNode.isRate) for (b = this.parent.itemLis.length, c = "on", d = 0; b > d; d++) c = d < this.value ? "on" : "off", this.parent.itemLis[d].className = c + a.dataNode._mode
}

function itemMouseOut() {
    var b, c, d, e, a = this.parent.parent || this.parent;
    if (a.dataNode.isRate) for (b = this.parent.itemLis.length, c = "on", d = this.parent.holder || 0, e = 0; b > e; e++) c = d > e ? "on" : "off", this.parent.itemLis[e].className = c + a.dataNode._mode
}

function itemLiClick() {
    var c, a = this.parent.parent || this.parent, b = a.dataNode;
    if (updateProgressBar(b), b.isRate) {
        for (this.parent.holder = this.value, c = 0; c < this.value; c++) this.parent.itemLis[c].className = "on" + b._mode;
        b._requir || a.hasClearHref || addClearHref(a), displayRelationRaidoCheck(a, b), jump(a, this), 0 == itempopUpindex && processSamecount(a, this)
    }
}

function set_data_fromServer(a) {
    var c, d, f, g, h, i, j, k, l, m, n, o, b = new Array;
    for (b = a.split("¤"), c = b[0], d = c.split("§"), hasTouPiao = "true" == d[0], useSelfTopic = "true" == d[1], f = 0, g = !0, h = 0, i = 1; i < b.length; i++) switch (j = new Object, k = b[i].split("§"), k[0]) {
        case"page":
            g ? g = !1 : f++, h = 0, "true" == k[2] ? pageHolder[f]._iszhenbie = !0 : "time" == k[2] && (pageHolder[f]._istimer = !0), pageHolder[f]._mintime = k[3] ? parseInt(k[3]) : "", pageHolder[f]._maxtime = k[4] ? parseInt(k[4]) : "";
            break;
        case"question":
            j._type = trim(k[0]), j._topic = trim(k[1]), j._height = trim(k[2]), j._maxword = trim(k[3]), j._requir = "true" == k[4] ? !0 : !1, j._norepeat = "true" == k[5] ? !0 : !1, j._hasjump = "true" == trim(k[6]) ? !0 : !1, j._anytimejumpto = trim(k[7]), j._verify = trim(k[8]), j._needOnly = "true" == k[9] ? !0 : !1, j._hasList = "true" == k[10] ? !0 : !1, j._listId = k[11] ? parseInt(k[11]) : -1, j._minword = k[12], pageHolder[f].questions[h].dataNode = j, h++;
            break;
        case"slider":
            j._type = trim(k[0]), j._topic = trim(k[1]), j._requir = "true" == k[2] ? !0 : !1, j._minvalue = trim(k[3]), j._maxvalue = trim(k[4]), j._hasjump = "true" == trim(k[5]) ? !0 : !1, j._anytimejumpto = trim(k[6]), pageHolder[f].questions[h].dataNode = j, h++;
            break;
        case"fileupload":
            j._type = trim(k[0]), j._topic = trim(k[1]), j._requir = "true" == k[2] ? !0 : !1, j._maxsize = trim(k[3]), j._ext = trim(k[4]), j._hasjump = "true" == trim(k[5]) ? !0 : !1, j._anytimejumpto = trim(k[6]), pageHolder[f].questions[h].dataNode = j, h++;
            break;
        case"gapfill":
            j._type = trim(k[0]), j._topic = trim(k[1]), j._requir = "true" == k[2] ? !0 : !1, j._gapcount = trim(k[3]), j._hasjump = "true" == trim(k[4]) ? !0 : !1, j._anytimejumpto = trim(k[5]), pageHolder[f].questions[h].dataNode = j, h++;
            break;
        case"sum":
            j._type = trim(k[0]), j._topic = trim(k[1]), j._requir = "true" == k[2] ? !0 : !1, j._total = parseInt(k[3]), j._hasjump = "true" == trim(k[4]) ? !0 : !1, j._anytimejumpto = trim(k[5]), j._referTopic = k[6], pageHolder[f].questions[h].dataNode = j, h++;
            break;
        case"radio":
        case"check":
        case"radio_down":
        case"matrix":
            for (j._type = trim(k[0]), j._topic = trim(k[1]), j._numperrow = trim(k[2]), j._hasvalue = "true" == k[3] ? !0 : !1, j._hasjump = "true" == k[4] ? !0 : !1, j._anytimejumpto = k[5], j._mode = trim(k[9]), "check" != k[0] ? (j._requir = "true" == k[6] ? !0 : !1, j.isSort = !1, j.isRate = isRadioRate(j._mode)) : (l = k[6].split(","), j._minValue = 0, j._maxValue = 0, j._requir = "true" == l[0] ? !0 : !1, "" != l[1] && (j._minValue = Number(l[1])), "" != l[2] && (j._maxValue = Number(l[2])), j.isSort = "" != j._mode && "0" != j._mode, j.isRate = !1), j._isTouPiao = "true" == k[7] ? !0 : !1, j._verify = trim(k[8]), j._referTopic = k[10], j._referedTopics = k[11], m = 12, j._select = new Array, n = m; n < k.length; n++) j._select[n - m] = new Object, o = k[n].split("〒"), j._select[n - m]._item_radio = "true" == o[0] ? !0 : !1, j._select[n - m]._item_value = trim(o[1]), j._select[n - m]._item_jump = trim(o[2]), j._select[n - m]._item_huchi = "true" == o[3], j._select[n - m]._item_huchi && (j.hasHuChi = !0);
            pageHolder[f].questions[h].dataNode = j, h++
    }
}

function show_pre_page() {
    var b, c, d, e, f, g;
    if (cur_page > 0 && pageHolder[cur_page - 1].hasExceedTime) return popUpAlert("上一页填写超时，不能返回上一页"), void 0;
    for (showSubmitTable(!1), next_page.style.display = "", pageHolder[cur_page].style.display = "none", cur_page--, window.isKaoShi, b = cur_page; b >= 0 && pageHolder[b].skipPage; b--) cur_page--;
    for (b = cur_page; b >= 0; b--) {
        for (c = pageHolder[b].questions, d = !1, e = 0; e < c.length; e++) if (f = c[e], "none" != f.style.display) {
            d = !0;
            break
        }
        if (g = !1, !d && pageHolder[b].cuts && pageHolder[b].cuts.length > 0) for (e = 0; e < pageHolder[b].cuts.length; e++) if ("none" != pageHolder[b].cuts[e].style.display) {
            g = !0;
            break
        }
        if (d || g || !(cur_page > 0)) break;
        cur_page--
    }
    0 == cur_page && pre_page && (pre_page.style.display = "none", pre_page.disabled = !0), showDesc(), pageHolder[cur_page].style.display = "", c = pageHolder[cur_page].questions, pageHolder[cur_page].scrollIntoView(), postHeight()
}

function checkDisalbed() {
    if (curdiv = null, !submit_button.disabled) return !1;
    if (divMinTime.innerHTML) {
        var a = divMinTime.innerHTML.replace(/<.+?>/gim, "");
        popUpAlert(a)
    }
    return !0
}

function dataenc(a) {
    var c, d, e, b = ktimes % 10;
    for (0 == b && (b = 1), c = [], d = 0; d < a.length; d++) e = a.charCodeAt(d) ^ b, c.push(String.fromCharCode(e));
    return c.join("")
}

function show_next_page(a) {
    if (next_page && (next_page.disabled = !0), curdiv = null, 1 != pubNoCheck) {
        if (1 != a && !validate()) return isPub && null == pubNoCheck ? (maxCheatTimes > 0 && (fireConfirm = !0), window.confirm("您填写的数据不符合要求，由于您是发布者，可以选择直接跳到下一页（此次填写的答卷将不能提交），是否确定？") ? (pubNoCheck = !0, document.getElementById("submittest_button").onclick = submit_button.onclick = function () {
            checkDisalbed() || popUpAlert("由于您选择了跳过了数据检查，所以此次填写的答卷无法提交！如果您需要提交答卷，请刷新此页面并再次填写问卷。")
        }, to_next_page(), void 0) : (pubNoCheck = !1, next_page.disabled = !1, void 0)) : (next_page.disabled = !1, void 0)
    } else if (1 == pubNoCheck) return to_next_page(), void 0;
    needSubmitNotValid && "true" == isRunning && 1 != a ? submit(3) : pageHolder[cur_page]._iszhenbie && "true" == isRunning && 1 != a && !isAutoSubmit ? submit(3) : (to_next_page(), 1 != a && allowSaveJoin && "true" == isRunning && guid && (saveNeedAlert = !1, submit(2)))
}

function to_next_page() {
    var a, c, d, f, g, h, i;
    for (0 == cur_page && nextPageAlertText && popUpAlert(nextPageAlertText), pre_page.style.display = displayPrevPage, pre_page.disabled = !1, pageHolder[cur_page].style.display = "none", cur_page++, next_page.disabled = !1, a = cur_page; a < pageHolder.length && pageHolder[a].skipPage; a++) cur_page++;
    for (window.isKaoShi, a = cur_page; a < pageHolder.length; a++) {
        for (c = pageHolder[a].questions, d = !1, f = 0; f < c.length; f++) if (g = c[f], "none" != g.style.display) {
            d = !0;
            break
        }
        if (h = !1, !d && pageHolder[a].cuts && pageHolder[a].cuts.length > 0) for (f = 0; f < pageHolder[a].cuts.length; f++) if ("none" != pageHolder[a].cuts[f].style.display) {
            h = !0;
            break
        }
        if (d || h || !(cur_page < pageHolder.length - 1)) break;
        cur_page++
    }
    for (i = !0, a = cur_page + 1; a < pageHolder.length; a++) pageHolder[a].skipPage || (i = !1);
    cur_page >= pageHolder.length - 1 || i ? (next_page.style.display = "none", "1" != hasJoin && showSubmitTable(!0)) : cur_page < pageHolder.length - 1 && (next_page.style.display = ""), divMaxTime && (divMaxTime.style.display = "none"), showDesc(), window.divPromote && (divPromote.style.display = cur_page > 0 ? "none" : ""), pageHolder[cur_page].style.display = "", pageHolder[cur_page].scrollIntoView(), showProgressBar(), processMinMax(), postHeight()
}

function showDesc() {
    if (window.divDec) {
        var a = document.getElementById(window.divDec);
        a && (a.style.display = cur_page > 0 ? "none" : "")
    }
}

function processError(a, b, c) {
    var d, e, f;
    havereturn || (havereturn = !0, d = "", e = encodeURIComponent(answer_send), e.length > 1800 ? d = c + "&submitdata=exceed" : (d = c, -1 == c.indexOf("submitdata=") && (d += "&submitdata=" + e), -1 == c.indexOf("useget=") && (d += "&useget=1"), -1 == c.indexOf("iframe=") && (d += "&iframe=1")), errorTimes++, 1 != errorTimes || hasSendErrorMail || (d += "&nsd=1", hasSendErrorMail = !0), f = document.createElement("img"), f.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/submiterror/track.gif?APIVersion=0.6.0&activity=" + activityId + "&starttime=" + encodeURIComponent(starttime) + "&status=" + a + "&errortimes=" + errorTimes + "&ua=" + encodeURIComponent(navigator.userAgent) + "&answer=" + encodeURIComponent(answer_send) + "&submittype=" + b + "&url=" + encodeURIComponent(c), PDF_launch("/wjx/join/jqerror.aspx?" + d + "&status=" + encodeURIComponent(a) + "&et=" + errorTimes, 400, 120), refresh_validate(), submit_tip.style.display = "none", submit_div.style.display = "block"), prevsaveanswer = "", window.submitWithGet || (window.submitWithGet = 1), timeoutTimer && clearTimeout(timeoutTimer)
}

function submit(a) {
    var b, d, e, f, g, h, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
    if (2 == a || validate()) {
        if (1 == a) if (window.useAliVerify) {
            if (!isCaptchaValid) return b = document.getElementById("captcha"), document.getElementById("captcha").style.display = "", b.hasInit || (b.hasInit = !0, 1 == useAliVerify ? captchaOjb.init() : captchaOjb.init(nc_option)), !1
        } else if (tCode && "none" != tCode.style.display && ("" == submit_text.value || submit_text.value == validate_info_submit_title3)) {
            popUpAlert(validate_info_submit1);
            try {
                submit_text.focus(), submit_text.click()
            } catch (c) {
            }
            return !1
        }
        if (submit_tip.innerHTML = validate_info_submit2, d = 1, 0 == a ? PromoteUser("正在处理，请稍候...", 3e3, !0) : 2 == a ? (d = cur_page, hlv = "1") : 3 == a ? PromoteUser("正在验证，请稍候...", 3e3, !0) : (submit_tip.style.display = "block", submit_div.style.display = "none"), needCheckLeave = !1, answer_send = sent_to_answer(), 2 == a && prevsaveanswer == answer_send) return e = "已保存", 1 == langVer && (e = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>"), spanSave && (spanSave.innerHTML = e), void 0;
        if (f = getXmlHttp(), f.onreadystatechange = function () {
            if (4 == f.readyState) {
                clearTimeout(timeoutTimer);
                var b = f.status;
                200 == b ? (afterSubmit(f.responseText, a), prevsaveanswer = answer_send) : processError(b, a, g)
            }
        }, g = "submittype=" + a + "&curID=" + activityId + "&t=" + (new Date).valueOf(), source && (g += "&source=" + encodeURIComponent(source)), window.udsid && (g += "&udsid=" + window.udsid), window.fromsour && (g += "&fromsour=" + window.fromsour), nvvv && (g += "&nvvv=1"), window.wxUserId && (g += "&wxUserId=" + window.wxUserId), window.cProvince && (g += "&cp=" + encodeURIComponent(cProvince.replace("'", "")) + "&cc=" + encodeURIComponent(cCity.replace("'", "")) + "&ci=" + escape(cIp), 0 == jiFen)) {
            h = cProvince + "," + cCity;
            try {
                setCookie("ip_" + cIp, h, null, "/", "", null)
            } catch (i) {
            }
        }
        for (hasTouPiao && (g += "&toupiao=t"), jiFen > 0 && (g += "&jf=" + jiFen), randomparm && (g += "&ranparm=" + randomparm), inviteid && (g += "&inviteid=" + encodeURIComponent(inviteid)), SJBack && (g += "&sjback=1"), window.cpid && (g += "&cpid=" + cpid), 2 == a && (g += "&lastpage=" + d + "&lastq=" + MaxTopic), 3 == a && (g += "&zbp=" + (cur_page + 1), needSubmitNotValid && (g += "&nsnv=1")), hasJoin && (g += "&nfjoinid=" + nfjoinid), window.sojumpParm && (j = window.sojumpParm, window.hasEncode || (j = encodeURIComponent(j)), g += "&sojumpparm=" + j), tCode && "none" != tCode.style.display && "" != submit_text.value && (g += "&validate_text=" + encodeURIComponent(submit_text.value)), window.useAliVerify && (g += "&nc_csessionid=" + encodeURIComponent(nc_csessionid) + "&nc_sig=" + encodeURIComponent(nc_sig) + "&nc_token=" + encodeURIComponent(nc_token) + "&nc_scene=" + nc_scene + "&validate_text=geet"), g += "&starttime=" + encodeURIComponent(starttime), guid && (g += "&emailguid=" + guid), window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)), window.sjts && (g += "&sjts=" + sjts), window.sjsign && (g += "&sjsign=" + encodeURIComponent(sjsign)), window.FromSj && (g += "&fromsj=1"), window.outuser && (g += "&outuser=" + encodeURIComponent(outuser), window.outsign && (g += "&outsign=" + encodeURIComponent(outsign))), g += "&ktimes=" + ktimes, window.mobileRnum && (g += "&m=" + window.mobileRnum), window.rndnum && (g += "&rn=" + encodeURIComponent(rndnum)), window.isKaoShi && rName && (g += "&rname=" + encodeURIComponent(rName.replace("(", "（").replace(")", "）"))), window.relts && (g += "&relts=" + relts), window.relusername && (g += "&relusername=" + encodeURIComponent(relusername)), window.relsign && (g += "&relsign=" + encodeURIComponent(relsign)), window.relrealname && (g += "&relrealname=" + encodeURIComponent(relrealname)), window.reldept && (g += "&reldept=" + encodeURIComponent(reldept)), window.relext && (g += "&relext=" + encodeURIComponent(relext)), Password && (g += "&psd=" + encodeURIComponent(Password)), PasswordExt && (g += "&pwdext=" + encodeURIComponent(PasswordExt)), hasMaxtime && (g += "&hmt=1"), g += "&hlv=" + hlv, sourceDetail && (g += "&sd=" + sourceDetail), imgVerify && (g += "&btuserinput=" + encodeURIComponent(submit_text.value), g += "&btcaptchaId=" + encodeURIComponent(imgVerify.captchaId), g += "&btinstanceId=" + encodeURIComponent(imgVerify.instanceId)), window.access_token && window.openid && (g += "&access_token=" + encodeURIComponent(access_token) + "&qqopenid=" + encodeURIComponent(openid)), window.initMaxSurveyTime && (g += "&mst=" + window.initMaxSurveyTime), k = window.alipayAccount || window.cAlipayAccount, k && (g += "&alac=" + encodeURIComponent(k)), shopHT.length > 0 && (l = document.getElementById("shopcart"), l && "none" != l.style.display && (g += "&ishop=1")), window.jqnonce && (g += "&jqnonce=" + encodeURIComponent(window.jqnonce), m = dataenc(window.jqnonce), g += "&jqsign=" + encodeURIComponent(m)), n = encodeURIComponent(answer_send), o = !1, p = "", q = "", r = 0; r < trapHolder.length; r++) {
            for (p = "", s = trapHolder[r].itemInputs, t = new Array, u = 0; u < s.length; u++) s[u].checked && t.push(s[u].value);
            for (t.sort(function (a, b) {
                return a - b
            }), u = 0; u < t.length; u++) p += t[u] + ",";
            if (v = trapHolder[r].getAttribute("trapanswer"), p && v && -1 == p.indexOf(v)) {
                o = !0, q = trapHolder[r].getAttribute("tikuindex");
                break
            }
        }
        o && (g += "&ite=1&ics=" + encodeURIComponent(q + ";" + p)), w = !1, x = "post", y = window.getMaxWidth || 1800, window.submitWithGet && n.length <= y && (w = !0), w ? (g += "&submitdata=" + n, g += "&useget=1", x = "get") : window.submitWithGet && (window.postIframe = 1), z = "/joinnew/processjq.ashx?" + g, f.open(x, z, !1), f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), havereturn = !1, window.postIframe ? postWithIframe(z, a) : w ? 2 == errorTimes || window.getWithIframe ? GetWithIframe(z, a, g) : (1 == a && (timeoutTimer = setTimeout(function () {
            processError("ajaxget", a, g)
        }, 2e4)), f.send(null)) : (1 == a && (timeoutTimer = setTimeout(function () {
            processError("ajaxpost", a, g)
        }, 2e4)), f.send("submitdata=" + n))
    }
}

function postWithIframe(a, b, c) {
    var d, e;
    1 == b && (timeoutTimer = setTimeout(function () {
        processError(answer_send, "postiframe", b, c)
    }, 2e4)), d = document.createElement("div"), d.style.display = "none", d.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='submitdata' name='submitdata' type='hidden'><input type='submit' value='提交' ></form>", document.body.appendChild(d), document.getElementById("submitdata").value = answer_send, e = document.getElementById("frameform"), e.action = a + "&iframe=1", e.submit()
}

function GetWithIframe(a, b, c) {
    var d, e, f;
    1 == b && (timeoutTimer = setTimeout(function () {
        processError(answer_send, "getiframe", b, c)
    }, 2e4)), d = document.createElement("div"), d.style.display = "none", e = a + "&iframe=1", d.innerHTML = "<iframe id='mainframe' name='mainframe'> </iframe>", document.body.appendChild(d), f = document.getElementById("mainframe"), f.src = e
}

function getExpDate(a, b, c) {
    var d = new Date;
    return "number" == typeof a && "number" == typeof b && "number" == typeof b ? (d.setDate(d.getDate() + parseInt(a)), d.setHours(d.getHours() + parseInt(b)), d.setMinutes(d.getMinutes() + parseInt(c)), d.toGMTString()) : void 0
}

function processRedirect(a) {
    var f, g, h, i, b = a[1], c = a[3] || "", d = a[2], e = a[4] || "";
    b && "?" != b[0] ? -1 == b.toLowerCase().indexOf("http://") && -1 == b.toLowerCase().indexOf("https://") && (b = "http://" + b) : b = window.location.href, f = !1, b.indexOf("{output}") > -1 && (window.sojumpParm ? b = b.replace("{output}", sojumpParm) : e && (b = b.replace("{output}", e)), f = !0), (window.sojumpParm || e) && (g = c.split(","), h = "sojumpindex=" + g[0], h = b.indexOf("?") > -1 ? "&" + h : "?" + h, g[1] && (h += "&totalvalue=" + g[1]), g[2] && (h += "&valuesign=" + encodeURIComponent(g[2])), -1 == b.toLowerCase().indexOf("sojumpparm=") && !f && window.sojumpParm && (h += "&sojumpparm=" + sojumpParm), -1 == b.toLowerCase().indexOf("pingzheng=") && !f && e && (h += "&pingzheng=" + e), b += h), i = 1e3, d && "不提示" != d && 0 == window.jiFenBao && !window.sojumpParm && (PromoteUser(d, 5e3, !0), i = 2e3);
    try {
        setCookie(activityId + "_save", "", getExpDate(-1, 0, 0), "/", "", null), maxCheatTimes > 0 && setCookie(activityId + "_" + "curCheatTime", 0, getExpDate(-1, 0, 0), "/", "", null)
    } catch (j) {
    }
    setTimeout(function () {
        location.replace(b)
    }, i)
}

function addtolog() {
    var b = document.createElement("img"), c = window.isVip ? 1 : 0,
        d = window.LogStoreLocal ? "activityfinishtest" : "activityfinish", e = window.cqType || 0;
    b.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/" + d + "/track.gif?APIVersion=0.6.0&activity=" + activityId + "&source=0&weixin=0&vip=" + c + "&qtype=" + e
}

function afterSubmit(a, b) {
    var c, d, e, f, g, i, j, k, n, o, p, q, r, s, t, u;
    if (havereturn = !0, errorTimes = 0, document.getElementById("PDF_bg_chezchenz") && PDF_close(), clearTimeout(timeoutTimer), c = a.split("〒"), d = c[0], 0 == b) 14 == d ? (e = c[1], f = "/joinnew/previewanswer.aspx?activityid=" + activityId + "&sg=" + e + "&t=" + (new Date).valueOf(), window.open(f), setTimeout(function () {
        popUpAlert("您的答卷还没有提交，请不要忘记提交答卷！")
    }, 1e4)) : popUpAlert("请点击预览答卷按钮"); else if (2 == b) {
        if (14 == d) {
            if (e = c[1], g = window.location.href.toLowerCase(), g = g.indexOf("?") > -1 ? g.indexOf("sg=") > -1 ? g.replace(/sg=([\w|\-]+)/g, "sg=" + e) : g + "&sg=" + e : g + "?sg=" + e, hrefSave && (getTop(hrefSave), spanSave || (spanSave = document.createElement("div"), divSaveText.appendChild(spanSave), spanSave.style.color = "#666666", spanSave.style.lineHeight = "14px", spanSave.style.width = "14px", divProgressImg ? divProgressImg.style.paddingLeft = "7px" : spanSave.style.paddingLeft = "15px"), i = new Date, j = i.getMinutes(), 10 > j && (j = "0" + j), k = i.getHours(), 10 > k && (k = "0" + k), spanSave.innerHTML = "答卷保存于<div id='saveData'>1</div><div id='divUnit'>秒</div>钟前", 1 == langVer && (spanSave.innerHTML = "<div style='font-size:18px;'>&nbsp;&nbsp;Saved</div>"), totalSaveSec = 1, spanSave.style.display = "", submit_tip.style.display = "none", clearInterval(changeInterval), changeInterval = setInterval(function () {
                var a = document.getElementById("saveData");
                a && (totalSaveSec++, a.innerHTML = totalSaveSec, totalSaveSec > 60 && (a.innerHTML = parseInt(totalSaveSec / 60), document.getElementById("divUnit").innerHTML = "分"))
            }, 1e3)), clearInterval(saveInterval), saveInterval = setInterval(function () {
                submit(2)
            }, 6e4), !window.saveGuid) try {
                setCookie(activityId + "_save", e, getExpDate(30, 0, 0), "/", "", null)
            } catch (m) {
            }
            return c[2] && (nfjoinid = c[2], hasJoin = "2"), c[3] && (starttime = c[3]), changeSave && (g = window.location.href, g += -1 == g.indexOf("?") ? "?csave=1" : "&csave=1", window.location = g), void 0
        }
    } else if (3 == b) {
        if (12 == d) return randomparm = c[1], PromoteUser("", 1, !0), to_next_page(), void 0;
        if (13 == d) return n = c[1], o = c[2] || "0", g = "/wjx/join/complete.aspx?q=" + activityId + "&s=" + simple + "&joinid=" + n, window.sojumpParm && (g += "&sojumpparm=" + encodeURIComponent(sojumpParm)), guid && (g += "&guid=" + guid), "t" == promoteSource && (g += "&ps=" + promoteSource), g += "&v=" + o, window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)), window.FromSj && (g += "&fromsj=1"), location.replace(g), void 0;
        if (11 == d) return processRedirect(c), void 0;
        if (5 == d) return popUpAlert(c[1]), submit_tip.innerHTML = c[1], void 0;
        if (c[2]) return popUpAlert(c[2]), submit_tip.innerHTML = c[2], void 0
    } else {
        if (10 == d) {
            g = c[1], g += "&s=" + simple, "t" == promoteSource && (g += "&ps=" + promoteSource), qwidth && (g += "&width=" + qwidth), inviteid && (g += "&inviteid=" + inviteid), source && (g += "&source=" + encodeURIComponent(source)), guid && (g += "&guid=" + guid), window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)), window.FromSj && (g += "&fromsj=1"), window.needJQJiang && (g += "&njqj=1"), window.HasJiFenBao && (g += "&hjfb=1"), startAge && (g += "&sa=" + encodeURIComponent(startAge)), endAge && (g += "&ea=" + encodeURIComponent(endAge)), rName && (p = rName.replace("(", "（").replace(")", "）"), g += "&rname=" + encodeURIComponent(p), setCookie("jcname", p, null, "/", "", null)), modata && setCookie("jcmob", modata, null, "/", "", null), gender && (g += "&ge=" + gender), marriage && (g += "&ma=" + marriage), education && (g += "&edu=" + education), window.sourcename && (g += "&souname=" + encodeURIComponent(sourcename)), window.sojumpParm && (g += "&sojumpparm=" + encodeURIComponent(sojumpParm)), shopHT.length > 0 && (q = document.getElementById("shopcart"), q && "none" != q.style.display && (g += "&ishop=1"));
            try {
                setCookie(activityId + "_save", "", getExpDate(-1, 0, 0), "/", "", null), maxCheatTimes > 0 && setCookie(activityId + "_" + "curCheatTime", 0, getExpDate(-1, 0, 0), "/", "", null)
            } catch (m) {
            }
            return isEdtData ? (PromoteUser("成功保存数据！", 0, !0), void 0) : (r = "提交成功！", 1 == langVer && (r = "Submitted successfully"), PromoteUser(r, 3e3, !0), addtolog(g), setTimeout(function () {
                location.replace(g)
            }, 1500), void 0)
        }
        if (11 == d) return addtolog(), processRedirect(c), void 0;
        if (9 == d || 16 == d || 23 == d) {
            if (s = parseInt(c[1]), t = s + 1 + "", u = c[2] || "您提交的数据有误，请检查！", -1 == s) return popUpAlert(u), submit_tip.innerHTML = u, void 0;
            1 == pageHolder.length && pageHolder[0].questions[s] ? (writeError(pageHolder[0].questions[s], u, 3e3), pageHolder[0].questions[s].scrollIntoView()) : questionsObject[t] ? (writeError(questionsObject[t], u, 3e3), popUpAlert(u), questionsObject[t].scrollIntoView()) : popUpAlert("您提交的数据有误，请检查！")
        } else if (7 == d) {
            if (popUpAlert(c[1]), !window.useAliVerify) {
                tCode.style.display = "", needAvoidCrack || (imgCode.style.display = "", imgCode.onclick = refresh_validate, imgCode.onclick()), submit_tip.style.display = "none", submit_div.style.display = "block";
                try {
                    submit_text.focus(), submit_text.click(), imgVerify && imgVerify.onclick()
                } catch (v) {
                }
            }
        } else if (2 == d) popUpAlert(c[1]), window.submitWithGet = 1; else {
            if (17 == d) return popUpAlert("密码冲突！在您提交答卷之前，此密码已经被另外一个用户使用了，请重新更换密码！\r\n系统会自动保存您当前填写的答卷，请复制新的链接重新提交此份答卷！"), submit(2), void 0;
            if (4 == d) return popUpAlert(c[1]), changeSave = !0, submit(2), void 0;
            if (5 == d) return popUpAlert(c[1]), submit_tip.innerHTML = c[1], void 0;
            if (33 == d) return popUpAlert(c[1]), window.location.href = window.location.href, void 0;
            if (34 == d) return popUpAlert("密码冲突！在您提交答卷之前，此密码已经被另外一个用户使用了，请更换密码重新填写问卷！"), window.location.href = window.location.href, void 0;
            if (19 == d) return popUpAlert(c[1]), window.location = "/", void 0;
            if (22 == d) return popUpAlert("提交有误，请输入验证码重新提交！"), needAvoidCrack || (tCode.style.display = "", imgCode.style.display = "", imgCode.onclick = refresh_validate, imgCode.onclick()), nvvv = 1, submit_tip.style.display = "none", submit_div.style.display = "block", void 0;
            popUpAlert(c[1])
        }
    }
    refresh_validate(), submit_tip.style.display = "none", submit_div.style.display = "block"
}

function getAgeGenderLabel(a, b) {
    var c, d;
    if ("radio" == a._type && b.itemInputs) {
        for (c = 0; c < b.itemInputs.length; c++) if (b.itemInputs[c].checked) {
            d = getNextNode(b.itemInputs[c]), labelName = d.innerHTML, labelIndex = c;
            break
        }
    } else "radio_down" == a._type && (labelName = b.itemSel.options[b.itemSel.selectedIndex].text, labelIndex = b.itemSel.selectedIndex - 1)
}

function getRname(a, b) {
    var c, d, e, f, g, h, i, j, k, l, m;
    if (!rName && !b.getAttribute("ceshi")) if ("question" == a._type) l = b.divTitle.innerHTML, (-1 != l.indexOf("姓名") || -1 != l.indexOf("名字")) && (a._height > 1 && l.length > 5 || (m = b.itemTextarea || b.itemInputs[0], m && (rName = m.value))); else if ("matrix" == a._type && "201" == a._mode) {
        for (c = b.getElementsByTagName("th"), d = 0; d < c.length; d++) if (c[d].innerHTML.indexOf("姓名") > -1 || c[d].innerHTML.indexOf("名字") > -1 || c[d].innerHTML.indexOf("姓") > -1 && c[d].innerHTML.indexOf("名") > -1) {
            e = c[d].parentNode.getElementsByTagName("textarea"), e[0] && (rName = e[0].value);
            break
        }
    } else if ("gapfill" == a._type && (f = b.innerHTML.indexOf("姓名"), g = b.innerHTML.indexOf("姓"), h = b.innerHTML.indexOf("名"), f > -1 || g > -1 && h > -1)) for (-1 == f && (f = h), i = b.getElementsByTagName("input"), d = 0; d < i.length; d++) if (j = i[d].id, k = b.innerHTML.indexOf(j), k > f) {
        rName = i[d].value;
        break
    }
}

function getM(a, b) {
    var c, e, f;
    modata || "question" == a._type && (c = b.divTitle.innerHTML, (-1 != c.indexOf("手机") || -1 != c.indexOf("联系方式")) && (e = b.itemTextarea || b.itemInputs[0], e && (f = /^\d{11}$/, f.exec(e.value) && (modata = e.value))))
}

function getAgeGender(a, b) {
    var c, d, e;
    if ("radio" == a._type || "radio_down" == a._type) if (c = b.divTitle.innerHTML, c.indexOf("年龄") > -1) {
        if (getAgeGenderLabel(a, b), !labelName) return;
        if (d = /[1-9][0-9]*/g, e = labelName.match(d), !e || 0 == e.length) return;
        if (e.length > 2) return;
        2 == e.length ? (startAge = e[0], endAge = e[1]) : 1 == e.length && (0 == labelIndex ? endAge = e[0] : startAge = e[0])
    } else if (c.indexOf("性别") > -1) {
        if (getAgeGenderLabel(a, b), !labelName) return;
        labelName.indexOf("男") > -1 ? gender = 1 : labelName.indexOf("女") > -1 && (gender = 2)
    } else if (c.indexOf("学历") > -1 || c.indexOf("教育程度") > -1) {
        if (getAgeGenderLabel(a, b), !labelName) return;
        labelName.indexOf("初中") > -1 ? education = 1 : labelName.indexOf("高中") > -1 || labelName.indexOf("中专") > -1 ? education = 2 : labelName.indexOf("大专") > -1 ? education = 3 : labelName.indexOf("本科") > -1 ? education = 4 : labelName.indexOf("硕士") > -1 ? education = 5 : labelName.indexOf("博士") > -1 && (education = 6)
    } else if (c.indexOf("婚姻") > -1) {
        if (getAgeGenderLabel(a, b), !labelName) return;
        labelName.indexOf("已婚") > -1 ? marriage = 1 : labelName.indexOf("未婚") > -1 ? marriage = 2 : labelName.indexOf("离婚") > -1 ? marriage = 3 : labelName.indexOf("再婚") > -1 && (marriage = 4)
    }
}

function sent_to_answer() {
    var e, f, h, i, j, k, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, N, O, P, Q, R,
        S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, a = new Array, b = 0, c = new Object, d = 1;
    for (e = 0; e < pageHolder.length; e++) for (f = pageHolder[e].questions, pageHolder[e]._maxtime > 0, h = 0; h < f.length; h++) {
        i = f[h].dataNode, j = "none" == f[h].style.display.toLowerCase() || f[h].dataNode._referTopic && !f[h].displayContent && !window.cepingCandidate || pageHolder[e].skipPage, f[h].isCepingQ && (j = !1), k = new Object, k._topic = i._topic, k._value = "", a[b++] = k;
        try {
            getAgeGender(i, f[h]), getRname(i, f[h]), getM(i, f[h])
        } catch (l) {
        }
        switch (window.isKaoShi && "1" != f[h].getAttribute("nc") && (c[i._topic] = d, d++), i._type) {
            case"question":
                if (j) {
                    k._value = "(跳过)", "1" == f[h].getAttribute("hrq") && (k._value = "Ⅳ");
                    continue
                }
                m = f[h].itemTextarea || f[h].itemInputs[0], n = m.value || "", n && m.lnglat && (n = n + "[" + m.lnglat + "]"), k._value = replace_specialChar(n);
                break;
            case"gapfill":
                if (j && "1" == f[h].getAttribute("hrq")) {
                    k._value = "Ⅳ";
                    continue
                }
                for (o = f[h].gapFills, p = 0; p < o.length; p++) p > 0 && (k._value += spChars[2]), j ? k._value += "(跳过)" : (n = trim(o[p].value.substring(0, 3e3)), n && o[p].lnglat && (n = n + "[" + o[p].lnglat + "]"), k._value += replace_specialChar(n));
                break;
            case"slider":
                if (q = f[h].divSlider.value, j) {
                    k._value = "(跳过)";
                    continue
                }
                k._value = void 0 == q ? "" : q;
                break;
            case"fileupload":
                if (r = f[h].fileName, j) {
                    k._value = "(跳过)";
                    continue
                }
                k._value = r || "";
                break;
            case"sum":
                for (s = f[h].itemInputs, gb = s.length, p = 0; gb > p; p++) t = s[p], u = 0 == f[h].relSum ? trim(t.value) || "0" : trim(t.value), "none" == f[h].itemTrs[p].style.display && (u = "Ⅳ"), p > 0 && (k._value += spChars[2]), v = f[h].itemTrs[p].getAttribute("rowid"), v && (k._value += v + spChars[4]), k._value += u;
                if (j) for (w = 0; gb > w;) 0 == w ? k._value = "(跳过)" : k._value += spChars[2] + "(跳过)", w++;
                break;
            case"radio":
            case"check":
                if (i.isSort) {
                    for (x = new Array, p = 0; p < f[h].itemInputs.length; p++) "checkbox" == f[h].itemInputs[p].type && (y = f[h].itemInputs[p].parentNode, z = y.getElementsByTagName("span")[0].innerHTML, "none" == y.parentNode.style.display && (z = ""), A = new Object, A.sIndex = z, B = f[h].itemInputs[p].value, j ? B = "-3" : z || (B = "-2"), A.val = B, f[h].itemInputs[p].checked && f[h].itemInputs[p].itemText && (C = f[h].itemInputs[p].itemText.value, C == defaultOtherText && (C = ""), A.val += spChars[2] + replace_specialChar(trim(C.substring(0, 3e3)))), A.sIndex || (A.sIndex = 1e4), x.push(A));
                    for (x.sort(function (a, b) {
                        return a.sIndex - b.sIndex
                    }), D = 0; D < x.length; D++) D > 0 && (k._value += ","), k._value += x[D].val;
                    continue
                }
                if (j) {
                    k._value = "-3", "1" == f[h].getAttribute("hrq") && (k._value = "-4");
                    continue
                }
                if (E = f[h].itemInputs || f[h].itemLis, f[h].isShop) {
                    for (F = !1, p = 0; p < E.length; p++) B = parseInt(E[p].value), B > 0 && (k._value && (k._value += spChars[3]), k._value += p + 1 + "", k._value += spChars[2] + B, F = !0);
                    F || (k._value = "-2");
                    continue
                }
                for (G = -1, H = 0, p = 0; p < E.length; p++) E[p].className.toLowerCase().indexOf("on") > -1 && (G = p), I = E[p].parentNode && "none" == E[p].parentNode.style.display, !I && E[p].checked && (H++, k._value ? k._value += spChars[3] + E[p].value : k._value = E[p].value + "", E[p].itemText && (C = E[p].itemText.value, C == defaultOtherText && (C = ""), k._value += spChars[2] + replace_specialChar(trim(C.substring(0, 3e3)))));
                G > -1 ? k._value = E[G].value + "" : H > 0 || (k._value = "-2");
                break;
            case"radio_down":
                if (j) {
                    k._value = "-3";
                    continue
                }
                k._value = f[h].itemSel.value;
                break;
            case"matrix":
                for (J = f[h].itemTrs, K = i._mode, gb = J.length, L = 0, N = 0, O = 0, P = new Array, Q = !1, p = 0; p < J.length; p++) if (R = J[p].getAttribute("rindex"), 0 == R && "true" == J[p].getAttribute("randomrow") && (Q = !0), S = new Object, S.rIndex = parseInt(R), T = "201" != K && "202" != K && "301" != K && "302" != K && "303" != K, "none" == J[p].style.display && T) U = "-4", k._value ? k._value += "," + U : k._value = U, S.val = U; else if (E = J[p].itemInputs || J[p].itemLis || J[p].divSlider || J[p].itemSels) {
                    if (L = E.length, G = -1, V = "", "201" != K && "202" != K) {
                        for (w = 0; w < E.length; w++) E[w].className.toLowerCase().indexOf("on") > -1 && (G = w, V = E[w].value), E[w].checked ? (G = w, V ? V += ";" + E[w].value : V = E[w].value, ("103" == K || "102" == K || "101" == K) && (W = E[w].getAttribute("needfill"), W && (X = E[w].fillvalue || E[w].getAttribute("fillvalue") || "", X == defaultOtherText && (X = ""), X = replace_specialChar(X).replace(/;/g, "；").replace(/,/g, "，"), V += spChars[2] + X))) : ("TEXTAREA" == E[w].tagName || "SELECT" == E[w].tagName) && (G = w, X = trim(E[w].value), "none" == J[p].style.display && (X = "Ⅳ"), w > 0 && (V += spChars[3]), X ? ("302" == K && (X && E[w].lnglat && (X = X + "[" + E[w].lnglat + "]"), X = replace_specialChar(X)), V += X) : V += "303" == K ? "-2" : "(空)");
                        G > -1 ? (k._value ? k._value += "301" == K || "302" == K || "303" == K ? spChars[2] + V : "," + V : k._value = V, S.val = V) : (k._value ? k._value += ",-2" : k._value = "-2", S.val = "-2")
                    } else "201" == K ? (B = trim(E[0].value.substring(0, 3e3)), "none" == J[p].style.display && (B = "Ⅳ"), B && E[0].lnglat && (B = B + "[" + E[0].lnglat + "]"), N > 0 ? k._value += spChars[2] + replace_specialChar(B) : k._value = replace_specialChar(B), S.val = replace_specialChar(B)) : "202" == K && (Y = void 0 == J[p].divSlider.value ? "" : J[p].divSlider.value, "none" == J[p].style.display && (Y = "Ⅳ"), N > 0 ? k._value += spChars[2] + Y : k._value = Y, S.val = Y);
                    P.push(S), N++
                } else gb -= 1, O = 1;
                if (j) {
                    for (w = 0, k._value = ""; gb > w;) {
                        if ("201" == K || "202" == K) 0 == w ? k._value = "(跳过)" : k._value += spChars[2] + "(跳过)"; else if ("301" == K || "302" == K || "303" == K) for (w > 0 && (k._value += spChars[2]), Z = 0; L > Z; Z++) Z > 0 && (k._value += spChars[3]), k._value += "303" == K ? "-3" : "(跳过)"; else 0 == w ? k._value = "-3" : k._value += ",-3";
                        w++
                    }
                    continue
                }
                for (P.sort(function (a, b) {
                    return a.rIndex - b.rIndex
                }), $ = spChars[2], "201" != K && "202" != K && "301" != K && "302" != K && "303" != K && ($ = ","), _ = "", ab = 0; ab < P.length; ab++) ab > 0 && (_ += $), bb = P[ab].rIndex, parseInt(bb) == bb && (R = parseInt(bb) + 1, _ += R + spChars[4]), _ += P[ab].val;
                k._value = _
        }
    }
    for (a.sort(function (a, b) {
        return a._topic - b._topic
    }), cb = "", h = 0; h < a.length; h++) h > 0 && (cb += spChars[1]), cb += a[h]._topic, cb += spChars[0], cb += a[h]._value;
    try {
        if (window.isKaoShi && c && window.localStorage && window.JSON) {
            if (db = localStorage.getItem("sortactivity"), db ? db += "," + activityId : db = activityId, db += "", eb = db.split(","), fb = 2, eb.length > fb) {
                for (gb = eb.length, h = 0; gb - fb > h; h++) hb = eb[0], eb.splice(0, 1), localStorage.removeItem("sortorder_" + hb);
                db = eb.join(",")
            }
            localStorage.setItem("sortactivity", db), ib = "sortorder_" + activityId, localStorage.setItem(ib, JSON.stringify(c))
        }
    } catch (l) {
    }
    return cb
}

function validate() {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L,
        M, N, O, P, R, S, T, U, a = !0;
    if (needSubmitNotValid = !1, b = pageHolder[cur_page].questions, hlv = "1", c = pageHolder[cur_page].hasExceedTime, firstError = null, firstMatrixError = null, curMatrixError = null, d = document.getElementById("divNA"), e = d.getElementsByTagName("input"), e[0].checked || e[1].checked) return popUpAlert("系统检测到非法填写问卷"), window.location.href = window.location.href, void 0;
    if (hasPeiEFull) return popUpAlert(peiemsg), !1;
    for (f = 0; f < b.length; f++) if (g = b[f].dataNode, h = g._hasjump, verifyMsg = "", i = "none" == b[f].style.display.toLowerCase() || pageHolder[cur_page].skipPage, b[f].removeError && b[f].removeError(), !(i || b[f].dataNode._referTopic && !b[f].displayContent && !window.cepingCandidate || c)) switch (g._type) {
        case"question":
            if (j = b[f].itemTextarea || b[f].itemInputs[0], k = j.value || "", g._requir && "" == trim(k) && (a = writeError(b[f], validate_info_q1, 3e3)), b[f].needsms && k && !b[f].issmsvalid && (a = writeError(b[f], "提示：您的手机号码没有通过验证，请先验证", 3e3)), k.length - 3e3 > 0 && (l = "您输入的字数超过了3000，请修改！", 1 == langVer && (l = "Please limit to 3000 characters."), a = writeError(b[f], l, 3e3)), m = g._verify, "密码" == m && (j.needCheckConfirm = !0, n = verifydata(j, m, g), "" != n && (a = writeError(b[f], n, 3e3))), o = b[f].getAttribute("issample"), p = !0, o && "t" != promoteSource && (p = !1), p && (k && (n = verifyMinMax(j, m, g._minword, g._maxword), "" != n && (a = writeError(b[f], n, 3e3))), "" != k && m && "0" != m && (n = verifydata(j, m, g), "" != n && (a = writeError(b[f], n, 3e3)))), a && "" != trim(k) && "true" == isRunning && g._needOnly) if (0 == j.isOnly) a = writeError(b[f], validate_only, 3e3); else if (1 != j.isOnly && "地图" != g._verify) return a = writeError(b[f], validate_error, 3e3), j.focus(), a;
            h && jumpAnyChoice(b[f], !0);
            break;
        case"gapfill":
            for (q = b[f].gapFills, r = 0; r < q.length; r++) if (k = q[r].value || "", "" == trim(k)) {
                if (g._requir && "0" != q[r].getAttribute("isrequir")) {
                    b[f].errorControl = q[r], a = writeError(b[f], validate_info_q1, 3e3);
                    break
                }
            } else {
                if (s = 0, s = validateMatrix(g, q[r], q[r])) {
                    b[f].errorControl = q[r], a = writeError(b[f], verifyMsg, 3e3);
                    break
                }
                if (q[r].getAttribute("needonly")) if (0 == q[r].isOnly) b[f].errorControl = q[r], a = writeError(b[f], validate_only, 3e3); else if (1 != q[r].isOnly && "地图" != q[r].getAttribute("itemverify")) {
                    b[f].errorControl = q[r], a = writeError(b[f], validate_error, 3e3);
                    break
                }
            }
            h && jumpAnyChoice(b[f], !0);
            break;
        case"slider":
            t = b[f].divSlider.value, g._requir && void 0 == t && (a = writeError(b[f], validate_info_wd1, 3e3)), h && jumpAnyChoice(b[f], !0);
            break;
        case"fileupload":
            g._requir && !b[f].fileName && (a = writeError(b[f], validate_info_f1, 3e3)), h && jumpAnyChoice(b[f], !0);
            break;
        case"sum":
            if (u = b[f].sumLeft, 0 == u) for (v = b[f].getElementsByTagName("input"), u = b[f].dataNode._total, w = 0; w < v.length; w++) x = v[w], y = b[f].itemTrs[w], "none" != y.style.display && (u -= parseInt(x.value));
            g._requir ? 0 != u && (a = !1, u || (u = 100), firstError || (firstError = b[f]), n = "<span style='color:red;'>" + sum_warn + "</span>", b[f].relSum && (b[f].relSum.innerHTML = sum_total + "<b>" + g._total + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g._total - u) + "</span>，" + n)) : void 0 != u && 0 != u && (a = !1, firstError || (firstError = b[f]), n = "<span style='color:red;'>" + sum_warn + "</span>", b[f].relSum && (b[f].relSum.innerHTML = sum_total + "<b>" + g._total + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (g._total - u) + "</span>，" + n)), h && jumpAnyChoice(b[f], !0);
            break;
        case"radio":
        case"check":
            if (b[f].itemSel) {
                z = b[f].itemSel, A = z.options, 0 == A.length && g._requir ? a = writeError(b[f], validate_info_o1, 3e3) : A.length > 0 && (0 != g._minValue && g._minValue != g._select.length || A.length == g._select.length ? g._maxValue > 0 && A.length > g._maxValue ? (B = validate_info + validate_info_check1 + g._maxValue + validate_info_check2, 0 == langVer && (B += ",您多选择了" + (A.length - g._maxValue) + "项"), a = writeError(b[f], B, 3e3)) : g._minValue > 0 && A.length < g._minValue && (B = validate_info + validate_info_check1 + g._minValue + validate_info_check2, 0 == langVer && (B += ",您少选择了" + (g._minValue - A.length) + "项"), a = writeError(b[f], B, 3e3)) : a = writeError(b[f], validate_info + validate_info_check3, 3e3)), h && jumpAnyChoice(b[f], !0);
                continue
            }
            for (A = b[f].itemInputs || b[f].itemLis, C = -1, D = 0, E = -1, r = 0; r < A.length; r++) b[f].isShop ? A[r].value && A[r].value - 0 > 0 && (D++, E = r) : A[r].className.toLowerCase().indexOf("on") > -1 && (C = r, E = r), A[r].checked && (D++, E = r, "radio" == g._type && h && g._select[A[E].value - 1] && -1 == g._select[A[E].value - 1]._item_jump && (needSubmitNotValid = !0), A[r].req && isTextBoxEmpty(A[r].itemText.value) && (a = writeError(b[f], validate_textbox, 3e3)));
            C > -1 ? hasChoice = !0 : D > 0 ? (hasChoice = !0, g._maxValue > 0 && D > g._maxValue ? (B = validate_info + validate_info_check4 + g._maxValue + type_check_limit5, 0 == langVer && (B += ",您多选择了" + (D - g._maxValue) + "项"), a = writeError(b[f], B, 3e3)) : g._minValue > 0 && D < g._minValue && (B = validate_info + validate_info_check5 + g._minValue + type_check_limit5, 0 == langVer && (B += ",您少选择了" + (g._minValue - D) + "项"), 1 == D && g._select[E - 1] && g._select[E - 1]._item_huchi ? B = "" : a = writeError(b[f], B, 3e3))) : g._requir && (a = writeError(b[f], validate_info_c1, 3e3)), h && ("radio" == g._type && g._anytimejumpto < 1 ? E > -1 ? processJ(b[f].indexInPage - 0, g._select[A[E].value - 1]._item_jump - 0, !0) : processJ(b[f].indexInPage - 0, 0, !0) : jumpAnyChoice(b[f], !0));
            break;
        case"radio_down":
            g._requir && 0 == b[f].itemSel.selectedIndex && (a = writeError(b[f], validate_info_c1, 3e3)), h && (b[f].itemSel.selectedIndex > 0 && g._select[b[f].itemSel.value - 1] && -1 == g._select[b[f].itemSel.value - 1]._item_jump && (needSubmitNotValid = !0), g._anytimejumpto < 1 ? 0 == b[f].itemSel.selectedIndex ? processJ(b[f].indexInPage - 0, 0, !0) : processJ(b[f].indexInPage - 0, g._select[b[f].itemSel.value - 1]._item_jump - 0, !0) : jumpAnyChoice(b[f], !0));
            break;
        case"matrix":
            for (F = b[f].itemTrs, G = g._mode, len = F.length, H = 0, I = 0, s = 0, r = 0; r < F.length; r++) if ("none" != F[r].style.display) if (A = F[r].itemInputs || F[r].itemLis || F[r].divSlider || F[r].itemSels) {
                if (C = -1, D = 0, "201" != G && "202" != G) {
                    for (K = 0; K < A.length; K++) if (A[K].className.toLowerCase().indexOf("on") > -1) C = K; else if (A[K].checked) {
                        if (C = K, D++, ("103" == G || "102" == G || "101" == G) && (L = A[K].getAttribute("needfill"), M = A[K].getAttribute("req"), L && M && (N = A[K].fillvalue || A[K].getAttribute("fillvalue") || "", isTextBoxEmpty(N)))) {
                            verifyMsg = validate_textbox, s = 1, firstMatrixError || (firstMatrixError = b[f].itemTrs[r]), showMatrixFill(A[K], 1);
                            break
                        }
                    } else if ("TEXTAREA" == A[K].tagName || "SELECT" == A[K].tagName) if (O = trim(A[K].value), C = K, O) "301" == G ? (O = DBC2SBC(A[K]), "数字" == g._verify && parseInt(O) != O ? I = 1 : "小数" != g._verify || /^(\-)?\d+(\.\d+)?$/.exec(O) ? (g._minvalue && parseInt(O) - parseInt(g._minvalue) < 0 || g._maxvalue && parseInt(O) - parseInt(g._maxvalue) > 0) && (I = 2) : I = 1, I && (J || (J = A[K]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r]))) : "302" == G && (s || (s = validateMatrix(g, A[K], A[K])), s && (J || (J = A[K]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r]))); else if (P = A[K].parentNode, "303" == G) {
                        if ("none" != P.style.display) {
                            C = -1;
                            break
                        }
                    } else if ("none" != P.style.display) {
                        if (C = -1, "301" == G && g._requir) {
                            I = 1, J || (J = A[K]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r]);
                            break
                        }
                        if ("302" == G) break
                    }
                    "102" == G && C > -1 && (g._maxvalue > 0 && D > g._maxvalue ? (B = validate_info + validate_info_check4 + g._maxvalue + type_check_limit5, 0 == langVer && (B += ",您多选择了" + (D - g._maxvalue) + "项"), verifyMsg = B, s = 1, firstMatrixError || (firstMatrixError = b[f].itemTrs[r])) : g._minvalue > 0 && D < g._minvalue && (B = validate_info + validate_info_check5 + g._minvalue + type_check_limit5, 0 == langVer && (B += ",您少选择了" + (g._minvalue - D) + "项"), verifyMsg = B, s = 1, firstMatrixError || (firstMatrixError = b[f].itemTrs[r])))
                } else "201" == G ? (s || (s = validateMatrix(g, F[r], A[0])), s && (J || (J = A[0]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r])), F[r].getAttribute("needonly") && (0 == F[r].isOnly ? (J || (J = A[0]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r]), verifyMsg = validate_only, s = 1) : 1 != F[r].isOnly && "地图" != F[r].getAttribute("itemverify") && (J || (J = A[0]), firstMatrixError || (firstMatrixError = b[f].itemTrs[r]), verifyMsg = validate_error, s = 1)), "" != trim(A[0].value) ? C = 0 : "0" == F[r].getAttribute("isrequir") && (C = 0)) : "202" == G && void 0 != F[r].divSlider.value && (C = 0);
                if (C > -1) H++; else if (g._requir) break
            } else len -= 1; else len -= 1;
            "201" != G && "302" != G || !s || (J && (b[f].errorControl = J), a = writeError(b[f], verifyMsg, 3e3), firstMatrixError && firstMatrixError.onclick()), g._requir && len > H && (a = writeError(b[f], validate_info + validate_info_matrix2 + validate_info_matrix1 + (H + 1) + validate_info_matrix3, 3e3), b[f].itemTrs[r] && !firstMatrixError && (firstMatrixError = b[f].itemTrs[r], R = b[f].getAttribute("DaoZhi"), R || b[f].itemTrs[r].onclick())), "102" != G && "103" != G && "101" != G || !s || (J && (b[f].errorControl = J), a = writeError(b[f], verifyMsg, 3e3), firstMatrixError && firstMatrixError.onclick()), "301" == G && I && (S = "", 2 == I && (g._minvalue && (S += "," + type_wd_minlimitDigit + ":" + g._minvalue), g._maxvalue && (S += "," + type_wd_maxlimitDigit + ":" + g._maxvalue)), J && (b[f].errorControl = J), a = writeError(b[f], validate_info + validate_info_matrix4 + S, 3e3), firstMatrixError && firstMatrixError.onclick()), h && jumpAnyChoice(b[f], !0)
    }
    for (T = 0; T < trapHolder.length; T++) if (trapHolder[T].pageIndex == cur_page + 1) {
        for (A = trapHolder[T].itemInputs, U = "", r = 0; r < A.length; r++) A[r].checked && (U += A[r].value + ",");
        if (!U) {
            a = writeError(trapHolder[T], validate_info_wd1, 3e3);
            break
        }
    }
    return firstError && (PromoteUser(validate_submit, 3e3, !1), firstMatrixError && firstMatrixError.parent == firstError ? firstMatrixError.scrollIntoView() : firstError.scrollIntoView()), a
}

function validateMatrix(a, b, c) {
    var f, g, h, i, j, d = 0;
    return c.value ? (c.value, f = b.getAttribute("itemverify") || "", g = b.getAttribute("minword") || "", h = b.getAttribute("maxword") || "", i = b.getAttribute("issample"), j = !0, verifyMsg = "", i && "t" != promoteSource && (j = !1), j && (verifyMsg = verifyMinMax(c, f, g, h)), "" != verifyMsg && (d = 1), j && 0 == d && f && "0" != f && (verifyMsg = verifydata(c, f, a), "" != verifyMsg && (d = 2)), d) : d
}

function removeError() {
    this.errorMessage && (this.errorMessage.innerHTML = "", this.removeError = null, this.style.border = "solid 2px white", this.errorControl && (this.errorControl.style.background = "white", this.errorControl = null))
}

function PromoteUser(a, b, c) {
    c ? show_status_tip(a, b) : popUpAlert(a)
}

function writeError(a, b, c, d) {
    var e, f, g;
    if (!a.errorMessage || "" == a.errorMessage.innerHTML) {
        if (a.dataNode && ("matrix" == a.dataNode._type && "202" == a.dataNode._mode || "slider" == a.dataNode._type) || d || (a.style.border = "solid 2px #ff9900"), !a.errorMessage) for (e = $$tag("div", a), f = 0; f < e.length; f++) if (g = e[f].className.toLowerCase(), "errormessage" == g) {
            a.errorMessage = e[f];
            break
        }
        if (a.errorMessage) return a.errorMessage.innerHTML = b, a.removeError = removeError, a.errorControl && (a.errorControl.style.background = "#FBD5B5"), firstError || (firstError = a), !1
    }
}

function show_status_tip(a, b) {
    submit_tip.style.display = "block", submit_tip.innerHTML = a, b > 0 && setTimeout("submit_tip.style.display='none'", b)
}

function isDate(a) {
    var c, b = new Array;
    if (-1 != a.indexOf("-")) b = a.toString().split("-"); else {
        if (-1 == a.indexOf("/")) return !1;
        b = a.toString().split("/")
    }
    return 4 == b[0].length && (c = new Date(b[0], b[1] - 1, b[2]), c.getFullYear() == b[0] && c.getMonth() == b[1] - 1 && c.getDate() == b[2]) ? !0 : !1
}

function DBC2SBC(a) {
    var b = a.value, c = b.dbc2sbc();
    return b != c && (a.value = c), a.value
}

function verifydata(a, b) {
    var f, d = trim(a.value), e = null;
    if ("email" == b.toLowerCase() || "msn" == b.toLowerCase()) return e = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, e.exec(d) ? "" : validate_email;
    if ("日期" == b || "生日" == b || "入学时间" == b) return isDate(d) ? "" : validate_date;
    if ("固话" == b) return d = DBC2SBC(a), e = /^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$/, e.exec(d) ? "" : validate_phone;
    if ("手机" == b) return d = DBC2SBC(a), e = /^\d{11}$/, e.exec(d) ? "" : validate_mobile;
    if ("密码" == b) return checkPassword(d, a);
    if ("确认密码" == b) {
        if (a && a.firstPwd && a.firstPwd.value != d) return "两次密码输入不一致！"
    } else {
        if ("电话" == b) return e = /(^\d{11}$)|(^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$)/, e.exec(d) ? "" : validate_mo_phone;
        if ("汉字" == b) return e = /^[\u4e00-\u9fa5·]+$/, e.exec(d) ? "" : validate_chinese;
        if ("姓名" == b) return e = /^[\u4e00-\u9fa5·]{2,10}$/, e.exec(d) ? "" : "姓名必须为2到10个汉字";
        if ("英文" == b) return e = /^[A-Za-z]+$/, e.exec(d) ? "" : validate_english;
        if ("网址" == b || "公司网址" == b) return e = /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, f = /^www.[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, e.exec(d) || f.exec(d) ? "" : validate_reticulation;
        if ("身份证号" == b) return d = DBC2SBC(a), e = /^\d{15}(\d{2}[A-Za-z0-9])?$/, e.exec(d) ? "" : validate_idcardNum;
        if ("学号" == b) {
            if (d = DBC2SBC(a), e = /^\d+$/, !e.exec(d)) return validate_num.replace("，请注意使用英文字符格式", "")
        } else if ("数字" == b) {
            if (d = DBC2SBC(a), e = /^(\-)?\d+$/, !e.exec(d)) return validate_num
        } else if ("小数" == b) {
            if (d = DBC2SBC(a), e = /^(\-)?\d+(\.\d+)?$/, !e.exec(d)) return validate_decnum
        } else if ("qq" == b.toLowerCase()) return d = DBC2SBC(a), e = /^\d+$/, f = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/, e.exec(d) || f.exec(d) ? "" : validate_qq
    }
    return ""
}

function checkPassword(a, b) {
    var f, c = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,20}/, d = /[a-zA-Z]+/, e = /[0-9]+/;
    return b && b.confirmPwd && b.needCheckConfirm && (f = trim(b.confirmPwd.value), f != a) ? "两次密码输入不一致！" : c.test(a) && d.test(a) && e.test(a) ? "" : c.test(a) ? d.test(a) ? e.test(a) ? "" : "密码中必须包含数字" : "密码中必须包含字母" : "密码长度在8-20位"
}

function verifyMinMax(a, b, c, d) {
    var f, e = a.value;
    if ("数字" == b || "小数" == b) {
        if (!afterDigitPublish) return "";
        if (e = DBC2SBC(a), f = /^(\-)?\d+$/, "小数" == b && (f = /^(\-)?\d+(\.\d+)?$/), !f.exec(e)) return "小数" == b ? validate_decnum : validate_num;
        if (0 != e && (e = e.replace(/^0+/, "")), "" != c) {
            if ("数字" == b && parseInt(e) - parseInt(c) < 0) return validate_num2 + c;
            if ("小数" == b && parseFloat(e) - parseFloat(c) < 0) return validate_num2 + c
        }
        if ("" != d) {
            if ("数字" == b && parseInt(e) - parseInt(d) > 0) return validate_num1 + d;
            if ("小数" == b && parseFloat(e) - parseFloat(d) > 0) return validate_num1 + d
        }
    } else {
        if ("" != d && e.length - d > 0) return validate_info_wd3.format(d, e.length);
        if ("" != c && e.length - c < 0) return validate_info_wd4.format(c, e.length)
    }
    return ""
}

function getXmlHttp() {
    var a;
    return window.XMLHttpRequest ? a = new XMLHttpRequest : window.ActiveXObject && (a = new ActiveXObject("Microsoft.XMLHTTP")), a
}

function postHeight() {
    if (window != window.top) try {
        var a = parent.postMessage ? parent : parent.document.postMessage ? parent.document : null;
        null != a && a.postMessage("heightChanged," + (document.documentElement.scrollHeight || document.body.scrollHeight), "*")
    } catch (b) {
    }
}

function avoidPaste() {
    var c, a = document.getElementsByTagName("input"), b = document.getElementsByTagName("textarea");
    for (c = 0; c < a.length; c++) a[c].onpaste = function () {
        return isTest ? !0 : this.parent && "1" == this.parent.getAttribute("nc") ? !0 : !1
    };
    for (c = 0; c < b.length; c++) b[c].onpaste = function () {
        return isTest ? !0 : this.parent && "1" == this.parent.getAttribute("nc") ? !0 : this.parent && "tr" == this.parent.tagName.toLowerCase() ? !0 : !1
    }
}

function setLastOp() {
    window.localStorage && localStorage.setItem("wjxlastanswer" + activityId, (new Date).getTime())
}

function setTimeOpup() {
    hasSurveyTime = !0, hasMaxtime = !0, divTimeUp && "none" != divTimeUp.style.display && PDF_close(), autoSubmit("由于您超过" + maxOpTime + "秒没有任何操作，系统为防止作弊不允许再作答！")
}

function replaceImg(a) {
    var b = "http://pubimageqiniu.paperol.cn", c = "//pubnewfr.paperol.cn";
    0 == a.src.indexOf("http://pubssl.sojump.com") || 0 == a.src.indexOf("https://pubssl.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.cn") || 0 == a.src.indexOf("http://pubssl.sojump.cn") ? a.src = a.src.replace("http://pubssl.sojump.com", b).replace("https://pubssl.sojump.com", b).replace("http://pubimage.sojump.com", b).replace("http://pubimage.sojump.cn", b).replace("http://pubssl.sojump.cn", b) : (0 == a.src.indexOf("http://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.cn") || 0 == a.src.indexOf("http://pubalifr.sojump.cn") || 0 == a.src.indexOf("https://pubali.sojump.cn") || 0 == a.src.indexOf("https://pubalifr.sojump.cn")) && (a.src = a.src.replace("http://pubalifr.sojump.com", c).replace("https://pubalifr.sojump.com", c).replace("http://pubali.sojump.com", c).replace("https://pubali.sojump.com", c).replace("http://pubali.sojump.cn", c).replace("https://pubali.sojump.cn", c).replace("http://pubalifr.sojump.cn", c).replace("https://pubalifr.sojump.cn", c))
}

function popUpAlert(a) {
    maxCheatTimes > 0 && window.screenfull ? window.screenfull.alert(a) : alert(a)
}

function CheckMax(a, b) {
    var c, d, e, f, g, h, i, j, k, l;
    if (!b || "radio" != b.type) return !0;
    if (c = b.value, d = a.parentNode.parentNode.parentNode, "table" != d.tagName.toLocaleLowerCase()) return !0;
    if (e = d.getElementsByTagName("thead")[0], f = e.getElementsByTagName("td"), !f[c - 1]) return !0;
    if (g = f[c - 1].getAttribute("itemmax"), g && g > 0) {
        for (h = d.getElementsByTagName("input"), i = 0, j = 0; j < h.length && (h[j].checked && h[j].value == c && i++, !(i >= g)); j++) ;
        if (i >= g) return k = f[c - 1].innerHTML, l = "提示：列选项“" + k + "”最多只允许选择" + g + "次", 1 == langVer && (l = 'Column "' + k + '" can choose at most ' + g + " times."), alert(l), !1
    }
    return !0
}

function elagerImg(a, b) {
    var c, d;
    a = a || window.event, a.stopPropagation && a.stopPropagation(), c = b.parentNode.getAttribute("pimg"), c || (c = b.parentNode.getElementsByTagName("img")[0].src), c && (d = document.createElement("img"), d.onload = function () {
        var b, d, e, f, g, h, i, a = document.getElementById("divImgPop");
        a || (a = document.createElement("div"), a.id = "divImgPop", document.body.appendChild(a)), a.style.overflow = "auto", b = this.width, d = this.height, e = (document.documentElement.clientWidth || document.body.clientWidth) - 60, f = (document.documentElement.clientHeight || document.body.clientHeight) - 40, i = .9, d > f * i ? (h = f * i, g += 17, g > e * i && (g = e * i + 17)) : b > e * i ? (g = e * i, h = g / b * d) : (g = b, h = d), a.innerHTML = "<img src=" + c + " alt=''/>", PDF_launch("divImgPop", g + 20, h + 20)
    }, d.src = c)
}

var hasAnswer, hrefSave, cur_page, jumpPages, pageHolder, trapHolder, totalQ, completeLoaded, MaxTopic, curdiv,
    curfilediv, isUploadingFile, hasZhenBiePage, progressArray, questionsObject, joinedTopic, randomparm, hasTouPiao,
    useSelfTopic, hlv, ZheZhaoControl, divTimeUp, needCheckLeave, txtCurCity, submit_tip, submit_div, hasPeiEFull,
    peiemsg, spChars, spToChars, submit_table, pre_page, next_page, submit_button, imgCode, submit_text, tCode,
    divMinTime, spanMinTime, divMaxTime, spanMaxTime, maxCounter, maxTimer, minTimer, initMaxSurveyTime, curMatrixFill,
    curMatrixError, divMatrixRel, matrixinput, relationHT, relationQs, relationGroup, relationGroupHT,
    relationNotDisplayQ, nextPageAlertText, hasMaxtime, imgVerify, isEdtData, shopHT, prevPostion, resizedMax,
    isAutoSubmit, curMatrixItem, loadcss, loadprogress, hasConfirmBtn, itempopUpindex, popUpindex, pubNoCheck,
    saveNeedAlert, ktimes, spanSave, saveInterval, changeInterval, totalSaveSec, havereturn, timeoutTimer, errorTimes,
    hasSendErrorMail, prevsaveanswer, answer_send, changeSave, nvvv, firstError, firstMatrixError, startAge, endAge,
    gender, education, marriage, labelName, labelIndex, rName, modata, verifyMsg, needSubmitNotValid, ii, allimgs, i,
    isopUp, saveTime, cTime, minutes, dTime, days, leftOpTime, divOpTip, intervalId, fireConfirm;
if ("function" != typeof Array.prototype.push && (Array.prototype.push = function () {
    for (var a = 0; a < arguments.length; a++) this[this.length] = arguments[a];
    return this.length
}), "function" != typeof Array.prototype.indexOf && (Array.prototype.indexOf = function (a) {
    for (var b = 0; b < this.length; b++) if (a === this[b]) return b;
    return -1
}), String.prototype.format = function () {
    var a = arguments;
    return this.replace(/\{(\d+)\}/g, function (b, c) {
        return a[c]
    })
}, String.prototype.dbc2sbc = function () {
    return this.replace(/[\uff01-\uff5e]/g, function (a) {
        return String.fromCharCode(a.charCodeAt(0) - 65248)
    }).replace(/\u3000/g, " ")
}, window.maxCheatTimes || (maxCheatTimes = 0), hasAnswer = !1, hrefSave = document.getElementById("hrefSave"), cur_page = 0, pageHolder = new Array, trapHolder = new Array, totalQ = 0, completeLoaded = !1, MaxTopic = 0, "none" != displayPrevPage || "1" != hasJoin && !isSuper || (displayPrevPage = ""), curdiv = null, curfilediv = null, isUploadingFile = !1, hasZhenBiePage = !1, progressArray = new Object, questionsObject = new Object, joinedTopic = 0, randomparm = "", hasTouPiao = !1, useSelfTopic = !1, hlv = "0", document.oncontextmenu = document.ondragstart = document.onselectstart = avoidCopy, ZheZhaoControl = null, divTimeUp = document.getElementById("divTimeUp"), document.onkeydown = forbidBackSpace, needCheckLeave = !0, allowSaveJoin && "true" == isRunning && guid && (window.onunload = function () {
    needCheckLeave && (maxCheatTimes > 0 && (fireConfirm = !0), confirm("您要保存填写的答卷吗？") && (submit(2), popUpAlert("答卷保存成功！")))
}), $$tag = function (a, b) {
    return b ? b.getElementsByTagName(a) : document.getElementsByTagName(a)
}, txtCurCity = null, submit_tip = document.getElementById("submit_tip"), submit_div = document.getElementById("submit_div"), hasPeiEFull = !1, peiemsg = "", spChars = ["$", "}", "^", "|", "!", "<"], spToChars = ["ξ", "｝", "ˆ", "¦", "！", "&lt;"], submit_table = document.getElementById("submit_table"), pre_page = document.getElementById("btnPre"), next_page = document.getElementById("btnNext"), submit_button = document.getElementById("submit_button"), imgCode = document.getElementById("imgCode"), submit_text = document.getElementById("yucinput"), tCode = document.getElementById(tdCode), divMinTime = document.getElementById("divMinTime"), spanMinTime = document.getElementById("spanMinTime"), divMaxTime = document.getElementById("divMaxTime"), spanMaxTime = document.getElementById("spanMaxTime"), maxCounter = 0, maxTimer = null, minTimer = null, initMaxSurveyTime = 0, curMatrixFill = null, curMatrixError = null, divMatrixRel = document.getElementById("divMatrixRel"), matrixinput = document.getElementById("matrixinput"), divMatrixRel.onclick = function (a) {
    if (curMatrixFill) {
        var b = curMatrixFill.parent.parent;
        b && b.removeError && b.removeError()
    }
    stopPropa(a)
}, matrixinput.onkeyup = matrixinput.onblur = matrixinput.onfocus = function () {
    if (curMatrixFill) {
        var b = this.value;
        (0 == b.indexOf("请注明...") || 0 == b.indexOf("Please specify")) && (this.value = b = ""), curMatrixFill.fillvalue = trim(b)
    }
}, relationHT = new Array, relationQs = new Object, relationGroup = new Array, relationGroupHT = new Object, relationNotDisplayQ = new Object, nextPageAlertText = "", hasMaxtime = !1, imgVerify = null, isEdtData = !1, shopHT = new Array, Init(), isAutoSubmit = !1, curMatrixItem = null, loadcss = null, loadprogress = null, hasConfirmBtn = !1, itempopUpindex = 0, popUpindex = 0, pubNoCheck = null, saveNeedAlert = !0, ktimes = 0, hrefPreview && (hrefPreview.onclick = function () {
    return submit(0), !1
}), spanSave = null, saveInterval = null, changeInterval = null, totalSaveSec = 1, hrefSave && (hrefSave.onclick = function () {
    return "true" != isRunning ? (popUpAlert("此问卷处于停止状态，不能保存！"), void 0) : (submit(2), !1)
}, "true" == isRunning && (saveInterval = setInterval(function () {
    submit(2)
}, 6e4))), havereturn = !1, timeoutTimer = null, errorTimes = 0, hasSendErrorMail = !1, prevsaveanswer = "", answer_send = "", changeSave = !1, nvvv = 0, firstError = null, firstMatrixError = null, startAge = 0, endAge = 0, gender = 0, education = 0,marriage = 0,labelName = "",labelIndex = 0,rName = "",modata = "",verifyMsg = "",needSubmitNotValid = !1,1 == nv) for (ii = cur_page; totalPage > ii && validate(); ii++) to_next_page();
for (postHeight(), allimgs = document.getElementsByTagName("img"), i = 0; i < allimgs.length; i++) allimgs[i].onerror = function () {
    this.onerror = null, replaceImg(this)
}, replaceImg(allimgs[i]);
window.isKaoShi && (avoidPaste(), window.maxOpTime && (isopUp = !1, window.localStorage && (saveTime = localStorage["wjxlastanswer" + activityId], saveTime && (cTime = (new Date).getTime(), minutes = (cTime - saveTime) / 6e4, 10 > minutes && (isopUp = !0, setTimeOpup(), showSubmitTable(!1)))), isopUp || (dTime = (new Date).getTime(), days = (dTime - saveTime) / 864e5, leftOpTime = maxOpTime + 5, document.onclick = document.onkeyup = document.onscroll = document.onmousemove = function () {
    leftOpTime = maxOpTime + 5
}, divOpTip = null, intervalId = setInterval(function () {
    if (0 >= leftOpTime) clearInterval(intervalId), setLastOp(), setTimeOpup(); else if (5 >= leftOpTime && divTimeUp) {
        if ("none" == divTimeUp.style.display) {
            PDF_launch("divTimeUp", 350, 60);
            var a = document.getElementById("PDF_bg_chezchenz");
            a && (a.onclick = a.onkeyup = a.onmousemove = a.onscroll = function () {
                leftOpTime = maxOpTime + 5, PDF_close()
            })
        }
        document.getElementById("divTimeUpTip").innerHTML = "<span style='color:red;'>" + leftOpTime + "</span>秒后无操作，将不允许再作答！"
    }
    leftOpTime--
}, 1e3)))), fireConfirm = !1;