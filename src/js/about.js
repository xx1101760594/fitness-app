// 引入css
require('../css/about.less');
document.ready(function(){
    // 获取dom
    let cuit=document.querySelector('.cuit');
    // 公共footer函数
    utils.addHomeFooter('about');

    // 点击退出按钮
    cuit.addEventListener('click',function(ev){
        localStorage.removeItem('user');
        location.href='./login.html';


    })






})