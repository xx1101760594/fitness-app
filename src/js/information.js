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


    // 上传端口数据
    let data = {
        gender: '',
        birthday: '',
        province: '',
        city: '',
        address :['','']
    }


    // 返回上一页
    backBtn.addEventListener('click', function () {
        history.back();
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
    let pid=0;
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
                    pid=result[0].value
                    // 渲染页面
                    provinceValDom.textContent = result[0].label;
                    cityValDom.textContent='请选择市区';
                },
                title: '选择你的省份'
            });
        })

    })
    // 市区
    cityDom.addEventListener('click', function (ev) {
        $http.get('/address/city/'+pid, function (res) {
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

    })


















})