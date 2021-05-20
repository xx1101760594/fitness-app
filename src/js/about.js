// 引入css
require('../css/about.less');
document.ready(function () {
    // 公共footer函数
    utils.addHomeFooter('about');
    // 获取dom
    let cuitDom = document.querySelector('.cuit');
    let userHeaderDom = document.querySelector('.user-header');
    let userTextDom = document.querySelector('.userText span');
    let userNameDom = document.querySelector('.user-name');
    let totalDom = document.querySelector('.total span');
    let weekDom = document.querySelector('.week span');
    let userDom=document.querySelector('.user');
    let userFileDom=document.querySelector('#user-file')


    // 获取本地数据
    let user = JSON.parse(localStorage.getItem('user'));
    // 获取个人信息
    function userFn(){
        $http.get('/users/accountinfo?userId='+user.userId,res=>{
            localStorage.setItem('user',JSON.stringify(res.data));
            if (res.data.imgurl) {
                userHeaderDom.src = res.data.imgurl
            };
            if (res.data.sign) {
                userTextDom.textContent = res.data.sign
            };
            if (res.data.nickname) {
                userNameDom.textContent = res.data.nickname
            };
        })
    }

    userFn();
    // 请求接口 渲染数据
    $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
        totalDom.textContent = res.data.sports.times;
        weekDom.textContent = res.data.sports.calorie;
    })
    // 点击切换页面
    userDom.addEventListener('click',function(ev){
        location.href='./information.html'
    })
    // 点击更换头像
    userHeaderDom.addEventListener('click',function(ev){
        // 触发file的点击
        userFileDom.click();
        // 停止冒泡
        ev.stopPropagation();
    });
    // 传输file  更换头像
    userFileDom.addEventListener('change',function(ev){
        // 传输数据
        $updateFile('/users/upload','imgurl',this.files[0],function(res){
            // 渲染更换头像
            userHeaderDom.src='http://139.9.177.51:8099'+res.data;
            // 修改头像
            let data={
                'userId':user.userId,
                'imgurl':'http://139.9.177.51:8099'+res.data
            };
            $http.post('/users/userEdit',data,function(res1){
                if(res1.status==0){
                    utils.toast(0,'修改成功');
                    userFn();
                }
            })
        })
    })




    // 点击退出按钮
    cuitDom.addEventListener('click', function (ev) {
        localStorage.removeItem('user');
        location.href = './login.html';

    })






})