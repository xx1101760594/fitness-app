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

window.utils = utils;