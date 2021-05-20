/**
 * 工具函数
 */
const utils = {};
// 手机号正则规则
utils.testTell = function (data) {
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(data)
}

// 提示框toast status 0为勾 1为叉
utils.toast = function (status, msg) {
    require('../../fonts/capFont/iconfont.css')
    let bodyDom = document.querySelector('body');
    let Div = document.createElement('div');
    bodyDom.appendChild(Div);
    Div.className = 'iconBox';
    let num='';
    if(status===0){
        num='icon-gou'
    }else if(status===1){
        num='icon-cha'
    }
    let html = `
<i class="iconfont ${num} text"></i>
<p>${msg}</p>
`
    Div.innerHTML = html;
    setTimeout(function () {
        Div.remove()
    },2000)
}


utils.addHomeFooter=function(page){
let footer=document.createElement('footer');
footer.classList.add('comBtBox');
let html=`
        <a href="./home.html">
            <div class="${page==='home'?'item-b active':'item-b'}">
                <i class="iconfont iconhome"></i>
                <p>首页</p>
            </div>
        </a>
        <a href="./exercise.html">
            <div class="${page==='exercise'?'item-b active':'item-b'}">
                <i class="iconfont iconsports"></i>
                <p>运动</p>
            </div>
        </a>
        <a href="./about.html">
            <div class="${page==='about'?'item-b active':'item-b'}">
                <i class="iconfont iconmine"></i>
                <p>我的</p>
            </div>
        </a>
`
footer.innerHTML=html;
document.querySelector('body').appendChild(footer);


}


/* 
@dateFormat 格林威治时间格式转换为标准时间
@date   格林威治时间
@return string（）2021-05-07 10:39:18
*/
utils.dateFormat = function (date) {
    //获取年月日分秒
    let y = date.getFullYear();//年
    let m = date.getMonth() + 1;//月
    let d = date.getDate();//日期
    let h = date.getHours();//小时
    let min = date.getMinutes();//分钟
    let s = date.getSeconds();//秒
    //添0补齐
    y = y < 10 ? '0' + y : y;
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    min = min < 10 ? '0' + min : min;
    s = s < 10 ? '0' + s : s;
    // return `${y}-${m}-${d} ${h}:${min}:${s}`
    return `${y}年${m}月${d}日`;
}

// location.search 值转换为对象
utils.stringToObj=function(str){
    let str1=str.substr(1);
    let arr=str1.split('&');
    let obj={};
    arr.forEach(function(item,index){
       let arr1=item.split('=');
       obj[arr1[0]]=arr1[1]
    })
    return obj;
}



window.utils = utils;