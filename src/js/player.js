require('../css/player.less');


document.ready(function () {

    let titleDom = document.querySelector('#title');
    let videoPlayerDom = document.querySelector('#video-player');
    let nowNumDom = document.querySelector('.now-num');
    let allNumDom = document.querySelector('.all-num');
    let backBtn = document.querySelector('#back');
    let stopBtn = document.querySelector('#stop');
    let nextBtn = document.querySelector('#next');
    let progressDom = document.querySelector('.progress');

    let videoList = JSON.parse(localStorage.getItem('videoList'));
    // 当前视频索引值
    let videoIndex = 0;

    function autoplay() {
        videoPlayerDom.src = BASE_URL + videoList[videoIndex].videoUrl;
        titleDom.textContent = videoList[videoIndex].title;
        nowNumDom.textContent = videoIndex + 1;
        allNumDom.textContent = videoList.length
    }
    autoplay();

    videoPlayerDom.addEventListener('ended', function (ev) {
        if (videoIndex < videoList.length - 1) {
            videoIndex++;
            autoplay();
        }
    });
    // 事件监听
    backBtn.addEventListener('click', function (ev) {
        if (videoIndex > 0) {
            videoIndex--;
            autoplay();
        }
    });
    nextBtn.addEventListener('click', function(ev) {
        if (videoIndex < videoList.length - 1) {
            videoIndex++;
            autoplay();
        }
    })
    // 自动播放

    setInterval(function(){
        videoPlayerDom.duration;
        videoPlayerDom.currentTime;
        let currentTime=videoPlayerDom.currentTime;
        let totalTime=videoPlayerDom.duration;
        let width=document.body.offsetWidth;
        let progress=width*(currentTime/totalTime)
        console.log(progress);
        // console.log(document.body.offsetWidth);
        // console.log(videoPlayerDom.duration);
        // console.log(videoPlayerDom.currentTime);
        progressDom.style.width=progress+'px';


    },30)








})