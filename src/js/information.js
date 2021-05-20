require('../css/information.less');
document.ready(function () {
    // 获取dom
    let backBtn = document.querySelector('#back')
    let genderDom = document.querySelector('#gender');
    let genderValDom = document.querySelector('#gender-val');
    let birthdayDom = document.querySelector('#birthday');
    let birthdayValDom = document.querySelector('#birthday-val');
    let provinceDom = document.querySelector('#province');
    let provinceValDom = document.querySelector('#province-val');
    let cityDom = document.querySelector('#city');
    let cityValDom = document.querySelector('#city-val');

    let saveDom = document.querySelector('.save');
    let signDom = document.querySelector('.sign');
    let nicknameDom = document.querySelector('.nickname');

    let user = JSON.parse(localStorage.getItem('user'))
    // 渲染初始页面
    nicknameDom.value=user.nickname;
    signDom.value=user.sign;
    genderValDom.value=user.gender;
    // 转换时间并渲染
    let time=new Date(user.birthday);
    let times=utils.dateFormat(time)

    birthdayValDom.textContent=times;
    let arr=user.address.split(',');
    provinceValDom.textContent=arr[0];
    cityValDom.textContent=arr[1];
    
    // 上传端口数据  初始化默认数据
    let data = {
        userId: user.userId,
        gender: user.gender,
        birthday: user.birthday,
        address: []
    }


    // 返回上一页
    backBtn.addEventListener('click', function () {
        location.href = './about.html'
    })
    // picker事件 性别
    genderDom.addEventListener('click', function (ev) {
        weui.picker([{
                label: '男',
                value: 0
            },
            {
                label: '女',
                value: 1
            }
        ], {
            onConfirm: function (result) {
                // 赋值
                data.gender = result[0].label
                // 渲染页面
                genderValDom.textContent = result[0].label
            },
            title: '选择你的性别'
        });

    })

    // 生日
    birthdayDom.addEventListener('click', function (ev) {
        weui.datePicker({
            start: 1986,
            end: new Date().getFullYear(),

            onConfirm: function (result) {
                // 赋值
                data.birthday = result[0].value + '-' + result[1].value + '-' + result[2].value
                // 渲染
                birthdayValDom.textContent = result[0].label + result[1].label + result[2].label
            },
            title: '请选择你的生日'
        });
    })

    // 定义城市pid
    let pid = 0;
    // 省份
    provinceDom.addEventListener('click', function (ev) {
        // 获取端口数据
        $http.get('/address/province', function (res) {
            let province = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })


            weui.picker(province, {
                onConfirm: function (result) {
                    // 赋值
                    data.address[0] = result[0].label;
                    data.address[1] = '';
                    pid = result[0].value
                    // 渲染页面
                    provinceValDom.textContent = result[0].label;
                    cityValDom.textContent = '请选择市区';
                },
                title: '选择你的省份'
            });
        })

    })

    // 市区

    cityDom.addEventListener('click', function (ev) {
        if (pid) {
            $http.get('/address/city/' + pid, function (res) {
                let city = res.data.map(function (item) {
                    return {
                        label: item.name,
                        value: item.addressId
                    }
                })
                weui.picker(city, {
                    onConfirm: function (result) {
                        // 赋值
                        data.address[1] = result[0].label;
                        // 渲染页面
                        cityValDom.textContent = result[0].label
                    },
                    title: '选择你的市区'
                });
            })
        } else {
            utils.toast(1, '请先选择省份')
        }

    })

    // 保存信息 
    saveDom.addEventListener('click', function (ev) {
        data.nickname = nicknameDom.value;
        data.sign = signDom.value;
        data.birthday = new Date(data.birthday).getTime()+100000000;
        console.log(data);
        $http.post('/users/userEdit', data, res => {
            console.log(res);
            if (res.status == 0) {
                utils.toast(0, '修改成功');
            } 
            setTimeout(function(){
                location.href='./about.html'
            },2000)
        })
    })

















})