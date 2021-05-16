require('../css/login.less');
document.ready(function (ev) {
    // 获取dom
    let useIpt = document.querySelector('#use');
    let pwdIpt = document.querySelector('#pwd');
    let btnDom = document.querySelector('#btn');
    // 绑事件
    btnDom.addEventListener('click', function (ev) {
        // 判定是否输入值
        if (!(useIpt.value)) {
            utils.toast(1,'请输入账号');
            return
        }
        if (!(pwdIpt.value)) {
            utils.toast(1,'请输入密码');
            return
        }
        if (!utils.testTell(useIpt.value)) {
            // textC.textContent = '请输入正确的手机号';
            utils.toast(1,'请输入正确的手机号');
            return
        }
        // 登录
        let data={
            account:useIpt.value,
            password:pwdIpt.value
        }
        $http.post('/users/login', data, res => {
            // 获取用户数据
            if(res.msg=='OK'){
                let user=res.data.user
                // 用户数据存入localStorage
                localStorage.setItem('user',JSON.stringify(user));
                utils.toast(0,'登录成功');
                // 跳转主页
                location.href='../home.html'
            }else{
                utils.toast(1,'密码错误');
            }
        })

    })






})