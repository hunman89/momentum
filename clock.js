const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();                            // 현재 시간 객체
    const hours = date.getHours();                      // 시간 분 초로 나눈다.
    const minutes = date.getMinutes();        
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;       // 삼항 연산자를 통해 한자리수 숫자 앞에 '0'을 붙인다.
}

function init(){    
    getTime();
    setInterval(getTime, 1000);                         // 초 단위 간격으로 불러오기
}

init();
