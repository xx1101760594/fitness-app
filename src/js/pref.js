require('../css/pref.less');
document.ready(function (ev) {
    let captcha1 = new CaptchaMini();
    // 获取dom
    let tellDom = document.querySelector('#fistIpn');
    let yzmDom = document.querySelector('.yBox1');
    let pwdDom = document.querySelector('#pwd');
    let pwd1Dom = document.querySelector('#pwd1');
    let btnDom = document.querySelector('#btn');
    let textC = document.querySelector('.textC');
    // 验证码生成
    let yzmNum = '';
    captcha1.draw(document.querySelector('#captcha'), r => {
        yzmNum = r.toLowerCase()
    });
    // 绑事件
    btnDom.addEventListener('click', function (ev) {
        // 判断是否为空
        if (!(tellDom.value && pwdDom.value && yzmDom.value)) {
            utils.toast(1, '请填写完注册信息')
            return
        }
        // 判断验证码
        if (yzmDom.value.toLowerCase() != yzmNum) {
            utils.toast(1, '请输入正确验证码');
            return
        }
        // 判断两次密码是否一致
        if (pwdDom.value != pwd1Dom.value) {
            utils.toast(1, '两次密码不一致');
            return
        }
        // 手机号格式
        if (!utils.testTell(tellDom.value)) {
            utils.toast(1, '请输入正确的手机号');
            return
        }
        // 账号注册接口
        let data = {
            account: tellDom.value,
            password: pwd1Dom.value
        }
        $http.post('/users/add', data, res => {
            if (res.status === 0) {
                utils.toast(0, '注册成功，正在跳转');
                // 登录
                $http.post('/users/login', data, res1 => {
                    localStorage.setItem('user',res1.data.user)
                    跳转首页
                    setTimeout(function () {
                        location.href = './home.html'
                    }, 2000)
                })
            } else {
                utils.toast(1, res.msg);
            }
        })


    })

})