require('../css/datail.less');
document.ready(function () {

    let calorieDom = document.querySelector('#calorie');
    let coursetimsDom = document.querySelector('#coursetims');
    let cimgurlDom = document.querySelector('#imgurl');
    let nicknameDom = document.querySelector('#nickname');
    let descDom = document.querySelector('#desc');
    let nameDom = document.querySelector('#name');
    let bankBtn = document.querySelector('.bank');
    let centerBoxBtn = document.querySelector('.center-box');
    let beginBtn = document.querySelector('.begin');

    // 获取id
    let str = location.search;
    let courseId = utils.stringToObj(str).id
    // 获取端口信息  渲染页面
    let user = JSON.parse(localStorage.getItem('user'));
    $http.get('/users/mysportsBadge?userId=' + user.userId, res => {
        calorieDom.textContent = res.data.sports.calorie;
        coursetimsDom.textContent = res.data.sports.coursetims;

    })
    // 渲染页面
    cimgurlDom.src=user.imgurl;
    nicknameDom.textContent=user.nickname;

    // 获取所有课程
    $http.get('/sports/courseDetail?id=' + courseId,res=>{
        descDom.textContent=res.data.desc;
        nameDom.textContent=res.data.name;
        let videoList=res.data.fragments;
       
        // 数据存储给下个页面使用
        localStorage.setItem('videoList',JSON.stringify(videoList));
    })
    // 事件
    bankBtn.addEventListener('click',function(ev){
        history.back();
    })
    centerBoxBtn.addEventListener('click',function(ev){
        location.href='./player.html'
    })
    beginBtn.addEventListener('click',function(ev){
        location.href='./player.html'
    })




















})