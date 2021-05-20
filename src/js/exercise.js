// 引入css文件
require('../css/exercise.less');
utils.addHomeFooter('exercise');
document.ready(function () {
    // 获取dom
    let newCourseDom=document.querySelector('#newCourse');
    let courseDom=document.querySelector('#course-box');
    // 获取用户id
    let id = JSON.parse(localStorage.getItem('user')).userId;
    // 请求接口
    $http.get('/sports/courseList?id=' + id, res => {
        // 最新课程渲染页面
        let arrData=res.data
        let newArr=arrData.find(function(item){
            return item.latest==1
        })
        let newHtml=`
            <a href="./datail.html?id=${newArr.courseId}">
            <div class="newCourse-content">
            <img src="${BASE_URL+newArr.imgurl}"></img>
            <p class="fw">${newArr.name}</p>
            <p class="text-box">${newArr.desc}</p>     
            </div>
            </a>
        `
        newCourseDom.innerHTML=newHtml;
        // 课程渲染页面
        let html='';
        arrData.forEach(function(item,index){
            html+=`
                <a href="./datail.html?id=${item.courseId}">
                    <div class="course">
                        <img src="${BASE_URL+item.imgurl}" alt="">
                        <p class="course-title">${item.name}</p>
                        <p class="course-text">${item.desc}</p>
                    </div>
                </a>
            `
        })

      
        courseDom.innerHTML=html;
       



    })























})