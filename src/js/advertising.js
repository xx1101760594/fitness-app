// 引入css文件
require('../css/advertising.less');
//获取dom
document.ready(function () {
    let sBox1 = document.querySelector('.sBox1');
    let sBox2 = document.querySelector('.sBox2');
    // 定时跳转 清除定时器
    let sum = 5;
    let timeId = setInterval(function () {
        sum--;
        sBox1.innerHTML = `${sum}s`;
        if (sum <= 0) {
            if (localStorage.getItem('user')) {
                location.href = './home.html';
            } else {
                location.href = './login.html';
            }
            clearInterval(timeId)
        }
    }, 1000);
    // 点击跳转
    sBox2.addEventListener('click', function (event) {
        console.log(11);
        if (localStorage.getItem('user')) {
            location.href = './home.html';
        } else {
            location.href = './login.html';
        }
    })




})