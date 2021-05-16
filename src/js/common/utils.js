/**
 * 工具函数
 */
const utils = {};
// 手机号正则规则
utils.testTell = function (data) {
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(data)
}

// 提示框toast status 0为对 1为错
utils.toast = function (status, msg) {
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

window.utils = utils;