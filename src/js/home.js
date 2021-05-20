require('../css/home.less');
// 轮播图
document.ready(function () {
    // 获取dom
    let rank = document.querySelector('.rank');
    let punchIn = document.querySelector('.punchIn');
    let isPunch = document.querySelector('.isPunch');
    let insigniaNum = document.querySelector('.insigniaNum');


    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })
    utils.addHomeFooter('home');

    // 判断是否已经打卡
    // 首页接口数据
    let dataId = JSON.parse(localStorage.getItem('user'));

    function homeData(){
            $http.get('/headPageInfo?userId='+dataId.userId,res=>{
                if(res.status==0){
                    rank.textContent=res.data.rank;
                    punchIn.textContent=res.data.punchIn;
                    insigniaNum.textContent=res.data.insigniaNum;
                }else{
                    utils.toast(1,'数据错误请重新登录');
                        setTimeout(function(){
                            location.href='./login.html';
                        },2000) 
                };
                if ('true' === res.data.isPunch) {
                    isPunch.style.display = 'none';
                }
                if(res.data.rank>999){
                    rank.style.fontSize='50px'
                }
            })

    }
    homeData();
    // 打卡点击事件
    isPunch.addEventListener('click',function(ev){
        $http.get('/clockIn?userId='+dataId.userId,res1=>{
            if (res1.status === 0) {
                utils.toast(0, '打卡成功')
                homeData()
            }
        })
    })
})