/**
 * 查看ele对象的type属性
 * @param {元素对象} ele 
 * @param {属性} type 
 */
function getStyle(ele, type) {
    if (ele.currentStyle) {
        return ele.currentStyle[type];
    } else {
        return getComputedStyle(ele, null)[type];
    }
}
/**
 * 获取parent的子元素节点
 * 兼容
 * 在不同浏览器中childNodes和children识别的子节点不一定相同，但是在任意一个浏览器中，标签的nodeType都为1，所以只需将parent的子元素的nodeType为1的输出即可
 * @param {*} parent 
 */
function getChild(parent) {
    var arr = [];
    var child = parent.children;
    for (var i = 0; i < child.length; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}
/**
 * 查找parent的第一个子节点
 * 兼容
 * @param {*} parent 
 */
function firstChild(parent) {
    var child = parent.children;
    for (var i = 0; i < child.length; i++) {
        if (child[i].nodeType == 1) {
            return child[i];
        }
    }
}

/**
 * 查找最后一个子节点
 * 兼容
 * @param {*} parent 
 */
function lastChild(parent) {
    var child = parent.children;
    for (var i = child.length - 1; i >= 0; i--) {
        if (child[i].nodeType == 1) {
            return child[i];
        }
    }
}

//判断parent里面是不是有元素节点
/**
 * 查找parent有没有子节点
 * 兼容
 * 判断parent里面的标签节点，主要里面有nodeType为1的，就代表parent中有标签节点
 * @param {*} parent 
 */
function hasChildNodes(parent) {
    var child = parent.children;
    for (var i = 0; i < child.length; i++) {
        if (child[i].nodeType == 1) {
            return true;
        }
    }
    return false;
}

/**
 * 获取obj的下一个兄弟节点
 * 兼容
 * @param {*} obj 
 */
function nextSibling(obj) {
    return obj.nextElementSibling || obj.nextSibling;

}
/**
 * 获取obj的上一个兄弟节点
 * 兼容
 * @param {*} obj 
 */
function previousSibling(obj) {
    return obj.previousElementSibling || obj.previousSibling;
}
/**
 * 给target对象添加监听事件
 * addEventListener 不兼容ie8及以下
 * attachEvent  兼容ie8及以下
 * @param {需要添加事件的对象} target 
 * @param {事件类型} type 
 * @param {执行函数} handler 
 */
function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else {
        // 在ie8及以下，需要处理this的指向,call函数改变this指向
        window[handler] = function () {
            handler.call(target);
        }
        target.attachEvent("on" + type, window[handler]);
    }
}
/**
 * 给target对象删除监听事件
 * addEventListener 不兼容ie8及以下
 * attachEvent  兼容ie8及以下
 * @param {需要删除事件的对象} target 
 * @param {事件的类型} type 
 * @param {该事件对应的函数} handler 
 */
function removeEvent(target, type, handler) {
    if (target.addEventListener) {
        target.removeEventListener(type, handler, false);
    } else {
        target.detachEvent("on" + type, window[handler]);
    }
}
/**
 * 找到attr属性为value的节点
 * @param {目标对象，鼠标点击对象} target 
 * @param {属性名} attr 
 * @param {属性值} value 
 * @param {结束条件} end 
 */
function getTarget(target, attr, value, end) {
    while (target != end) { //如果鼠标点击的是end，则直接结束
        if (target[attr] == value) { //如果点击的对象的attr属性值为value，则返回该对象
            return target;
        }
        target = target.parentNode; //否则查找其父节点
    }
}
/**
 * 动画效果
 * @param {元素对象} el 
 * @param {结束条件} endObj 
 * @param {回调函数} cb 
 * @param {时间} time 
 */
function animate(el, endObj, cb, time) {
    time = time || 200;
    var startObj = {};
    var _startObj = {};
    var speedObj = {};
    for (var i in endObj) {
        startObj[i] = parseInt(getStyle(el, i));
        _startObj[i] = startObj[i];
        speedObj[i] = 16.7 * (endObj[i] - startObj[i]) / time;
    }
    var flag = false;
    clearInterval(el.t);
    el.t = setInterval(function() {
        for (var j in endObj) {
            startObj[j] += speedObj[j];
            if (_startObj[j] < endObj[j] ? startObj[j] >= endObj[j] : startObj[j] <= endObj[j]) {
                startObj[j] = endObj[j];
                clearInterval(el.t);
                flag = true;
            }
            if (j == "opacity") {
                el.style[j] = startObj[j];
            } else {
                el.style[j] = startObj[j] + "px";
            }
        }
        if (flag && cb) {
            cb();
        }
    }, 16.7);
}
/**
 * 取消冒泡
 * @param {事件} e 
 */
function cancelBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble=true;
    }

}
/**
 * 阻止浏览器默认行为
 * @param {事件} e 
 */
function preventDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;
    }
}
/**
 * 获取窗口卷起高度
 */
function getScrollTop() {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}
/**
 * 设置窗口卷起高度
 * @param {窗口卷起高度} top 
 */
function setScrollTop(top) {
    document.documentElement.scrollTop = top;
    window.pageYOffset = top;
    document.body.scrollTop = top;
}
/**
 * 获取浏览器窗口的宽度和高度（兼容写法）
 */
function getWindow() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}