// banner部分
var bannerItem = document.querySelector(".banner-item");
var bannerPics = document.querySelectorAll(".banner .pic li");
var bannerDots = document.querySelectorAll(".banner .dot li");
var bannerDot = document.querySelector(".banner .dot");
var bannerDotSpans = bannerDot.querySelectorAll("span");
var banner = document.querySelector(".banner");
function BannerMove(bannerPics, bannerDots, bannerDotSpans) {
    this.bannerPics = bannerPics;
    this.bannerDots = bannerDots;
    this.bannerDotSpans = bannerDotSpans;
    this.curPic = 0;
    this.t = null;
    this.len = bannerPics.length;
    this.init();
}
BannerMove.prototype.init = function() {
    this.bannerDotsMove();
    this.bannerDotsOnclick();
}
BannerMove.prototype.bannerDotsMove = function() {
    var _this = this;
    animate(this.bannerDotSpans[this.curPic], {width: parseInt(getStyle(this.bannerDots[this.curPic], "width"))}, function() {
        _this.bannerPicIndex();
        _this.bannerPics[_this.curPic].style.zIndex = -3;
        _this.bannerDotSpans[_this.curPic].style.width = 0;
        _this.curPic++;
        if (_this.curPic == _this.len) {
            _this.curPic = 0;
        }
        _this.bannerPics[_this.curPic].style.zIndex = -2;
        _this.bannerPics[_this.curPic].style.opacity = 0;
        _this.bannerPics[_this.curPic].style.top = "30px";
        animate(_this.bannerPics[_this.curPic], {opacity: 1, top: 0});
        setTimeout(function() {
            _this.bannerDotsMove();
        }, 200);
    }, 2300);
}
BannerMove.prototype.bannerDotsOnclick = function() {
    for (var i = 0; i < this.len; i++) {
        var _this = this;
        this.bannerDots[i].index = i;
        // console.log(this.bannerDots[i]);
        this.bannerDots[i].onclick = function() {
            // _this.bannerDotSpans[_this.curPic].style.width = 0;
            // _this.curPic = this.index;
            // _this.bannerDotsMove();
        }
    }
}
BannerMove.prototype.bannerPicIndex = function() {
    for (var i = 0; i < this.len; i++) {
        this.bannerPics[i].style.zIndex = -4;
    }
}
var banner = new BannerMove(bannerPics, bannerDots, bannerDotSpans);
// 长图片动画效果
var serviceMain = document.getElementById("service-main");
var serviceIco = document.querySelectorAll("#service-ico div");
serviceMain.onmouseover = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "id", "service-ico", this);
    if (target) {
        var index = target.getAttribute( "index");
        if (!target.y) {
            target.y = 4500;
        }
        clearInterval(target.t);
        target.t = setInterval(function() {
            target.y -= 75;
            if (target.y <= 75) {
                target.y = 75;
                clearInterval(target.t);
            }
            serviceIco[index].style.backgroundPositionY = target.y + "px";
        }, 16.7);
    }
}
serviceMain.onmouseout = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "id", "service-ico", this);
    if (target) {
        var index = target.getAttribute( "index");
        clearInterval(target.t);
        target.t = setInterval(function() {
            target.y += 75;
            if (target.y >= 4500) {
                target.y = 4500;
                clearInterval(target.t);
            }
            serviceIco[index].style.backgroundPositionY = target.y + "px";
        }, 16.7);
    }
}
// 五环tab切换
var prodectTabs = document.getElementById("prodectTabs");
var prodectLayers = prodectTabs.querySelectorAll(".ali-product-layer");
var prodectTabsTexts = prodectTabs.querySelectorAll(".ali-pcText");
var aliProdectA = document.querySelectorAll(".ali-product-icon")
var aliProdectMain = document.getElementById("ali-prodect-main");
var aliProdectShowMore = document.getElementById("ali-product-show-more");
var prodectTabsAs = prodectTabs.querySelectorAll(".ali-product-tabs .ali-product-name");
var cur = 0;
var flag = true;
prodectTabsTexts[cur].parentNode.style.height = parseInt(getStyle(prodectTabsTexts[cur], "height")) + 40 + "px";
aliProdectMain.style.height = divHeight(prodectLayers, 3) + "px";
changeNewBack(aliProdectA[cur]);
prodectTabs.onmouseover = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "tagName", "A", this);
    if(target && target.getAttribute("index")) {
        var title = target.querySelector(".ali-product-name");
        // title.style.color = "#00c1de";
        target.onclick = function() {
            for (var i = 0; i < prodectTabsAs.length; i++) {
                prodectTabsAs[i].style.color = "#000";
            }
            title.style.color = "#00c1de";
            if (cur != target.getAttribute("index")) {
                changeOldBack(aliProdectA[cur]);
                changeNewBack(target.children[0]);
                prodectTabsTexts[cur].style.zIndex = 0;
                var oldHeight = parseInt(getStyle(prodectTabsTexts[cur], "height"));
                animate(prodectTabsTexts[cur], {opacity:0});
                if (prodectTabsTexts[cur].parentNode != prodectTabsTexts[target.getAttribute("index")].parentNode) {
                    animate(prodectTabsTexts[cur].parentNode, {height: 0});
                }
                cur = target.getAttribute("index");
                prodectTabsTexts[cur].style.zIndex = 1;
                var newHeight = parseInt(getStyle(prodectTabsTexts[cur], "height"));
                animate(prodectTabsTexts[cur].parentNode, {height: parseInt(getStyle(prodectTabsTexts[cur], "height")) + 40});
                animate(prodectTabsTexts[cur], {opacity:1});
                if (flag) {
                    animate(aliProdectMain, {height: divHeight(prodectLayers, 3) + newHeight - oldHeight});
                } else {
                    animate(aliProdectMain, {height: divHeight(prodectLayers) + newHeight - oldHeight});
                }
            }
        }
        target.onmouseleave = function() {
            // title.style.color = "#000";
        }
    }
    if(target && target.className.indexOf("item") != -1) {
        target.style.boxShadow = "0 0 2px 2px rgba(0, 0, 0, .3)";
        target.onmouseout = function() {
            target.style.boxShadow = "";
        }
    }
}
aliProdectShowMore.onclick = function() {
    if (flag) {
        animate(aliProdectMain, {height: divHeight(prodectLayers)});
        flag = false;
        this.innerHTML = "收起";
    } else {
        if(cur > 14) {
            animate(prodectTabsTexts[cur].parentNode, {height: 0});
            animate(prodectTabsTexts[0].parentNode, {height: parseInt(getStyle(prodectTabsTexts[0], "height")) + 40});
            var newHeight = parseInt(getStyle(prodectTabsTexts[0], "height"));
            animate(prodectTabsTexts[0], {opacity:1});
            animate(aliProdectMain, {height: divHeight(prodectLayers, 3) + newHeight + 40});
            cur = 0;
        } else {
            animate(aliProdectMain, {height: divHeight(prodectLayers, 3)});
        }
        flag = true;
        this.innerHTML = "查看全部";
    }
}
// 改变背景图片
function changeNewBack(sel) {
    var str = sel.getAttribute("style");
    strArr = str.split("old");
    str = strArr.join("new");
    sel.style = str;
}
function changeOldBack(sel) {
    var str = sel.getAttribute("style");
    strArr = str.split("new");
    str = strArr.join("old");
    sel.style = str;
}
// 计算高
function divHeight(obj, length) {
    var height = 0;
    var len = length || obj.length;
    for (var i = 0; i < len; i++) {
        height += obj[i].offsetHeight + 5;
    }
    return height;
}
// 分享中图片尺寸的变化
var shareMain = document.querySelector(".share-main");
shareMain.onmouseover = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "className", "share-box", this);
    if (target) {
        target.style.boxShadow = "0 0 10px #ccc";
        var imgBox = target.querySelector("img");
        animate(imgBox, {
            width: 393,
            height: 238,
            left: -8,
            top: -5
        });
    }
}
shareMain.onmouseout = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "className", "share-box", this);
    if (target) {
        target.style.boxShadow = "0 0 0 0 black";
        var imgBox = target.querySelector("img");
        animate(imgBox, {
            width: 377.6,
            height: 228.5,
            left: 0,
            top: 0
        });
    }
}

// 方案遮罩层特效
var container = document.querySelector(".container"), slide = document.querySelector(".slide");
var containerLeft = document.getElementById("container-left"), containerRight = document.getElementById("container-right");
var slides = slide.querySelectorAll("li");
slide.style.width = parseInt(getStyle(slides[0], "width")) * slides.length + "px";
container.style.height = getStyle(slide, "height");
window.onresize = function() {
    setWidth();
    container.style.height = getStyle(slide, "height");
    console.log(getWindow().width);
    if (getWindow().width <= 1800) {
        bannerItem.style.backgroundColor = "rgb(45, 48, 53)";
    } else {
        bannerItem.style.backgroundColor = "rgba(45, 48, 53, .5)";
    }
}
setWidth();
function setWidth() {
    var width = parseInt(getStyle(container, "width"));
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width / 5 + "px";
    }
}
container.onmouseover = function() {
    containerLeft.style.display = "block";
    containerRight.style.display = "block";
}
container.onmouseout = function() {
    containerLeft.style.display = "none";
    containerRight.style.display = "none";
}
containerLeft.onclick = function() {
    var width = parseInt(getStyle(slides[0], "width"));
    var left = parseInt(getStyle(slide, "left"));
    left += parseInt(getStyle(container, "width"));
    if (left >= 0) {
        left = 0;
    }
    animate(slide, {left: left});
}
containerRight.onclick = function() {
    var width = parseInt(getStyle(slides[0], "width"));
    var left = parseInt(getStyle(slide, "left"));
    left -= parseInt(getStyle(container, "width"));
    if (left <= -width * 6) {
        left = -width * 6;
    }
    console.log(width);
    animate(slide, {left: left});
}
slide.onmouseover = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "className", "mask", this);
    if(target) {
        function $(sel) {
            return target.querySelector(sel);
        }
        // var content = target.querySelector(".content");
        var content = $(".content"), itemLine = $(".item-line"), itemTitle = $(".item-title"), itemDesc = $(".item-desc"), itemLink = $(".item-link"), firstImg = $(".first-img"), secondImg = $(".second-img"), bg = $(".bg");
        animate(content, {top: 60});
        animate(itemLine, {opacity: 0});
        animate(itemTitle, {marginTop: 0});
        animate(itemDesc, {opacity: 1});
        animate(itemLink, {opacity: 1});
        // animate(firstImg, {opacity: 0});
        animate(secondImg, {opacity: 1});
    }
}
slide.onmouseout = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    target = getTarget(target, "className", "mask", this);
    if(target) {
        function $(sel) {
            return target.querySelector(sel);
        }
        var content = $(".content"), itemLine = $(".item-line"), itemTitle = $(".item-title"), itemDesc = $(".item-desc"), itemLink = $(".item-link"), firstImg = $(".first-img"), secondImg = $(".second-img"), bg = $(".bg");
        animate(content, {top: 100});
        animate(itemLine, {opacity: 1});
        animate(itemTitle, {marginTop: 24});
        animate(itemDesc, {opacity: 0});
        animate(itemLink, {opacity: 0});
        // animate(firstImg, {opacity: 1});
        animate(secondImg, {opacity: 0});
    }
}
// 水波纹功能实现
var pointAreas = document.querySelectorAll(".point-area");
autoBorderMove(pointAreas[0].children[2], pointAreas[0].children[3], null, parseInt(getStyle(pointAreas[0], "width")));
autoBorderMove(pointAreas[1].children[2], pointAreas[1].children[3], pointAreas[1].children[4], parseInt(getStyle(pointAreas[1], "width")));
autoBorderMove(pointAreas[2].children[2], pointAreas[2].children[3], pointAreas[2].children[4], parseInt(getStyle(pointAreas[2], "width")));
function autoBorderMove(el1, el2, el3, width) {
    borderMove(el1, width, function() {
        borderMove(el2, width, function() {
            if(el3) {
                borderMove(el3, width);
            }
        });
    });
    setInterval(function() {
        borderMove(el1, width, function() {
            borderMove(el2, width, function() {
                if(el3) {
                    borderMove(el3, width);
                }
            });
        });
    }, 4000);
}
function borderMove(obj, width, cb) {
    animate(obj, {width: width, height: width, opacity: 0}, function(){
        obj.style.width = 0;
        obj.style.height = 0;
        obj.style.opacity = 1;
    }, 2000);
    if (cb) {
        setTimeout(cb, 300);
    }
}
