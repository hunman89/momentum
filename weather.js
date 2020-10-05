const weather = document.querySelector(".js-weather");
const API_KEY = "71a06f56ff818eb3cf39ecad6226d725";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response) {             // 데이터가 오고 나서 다음 함수를 실행한다.
        return response.json();             // json으로 만든다
    }).then(function(json){                 // 만든 다음!(then) 실행        
        const img = document.createElement("img");
        const ws = json.weather[0].icon;
        const iconurl = `http://openweathermap.org/img/wn/${ws}.png`
        const tmp = json.main.temp;
        const place = json.name;
        img.src = iconurl;  
        weather.innerHTML = `<p>${tmp}℃ @ ${place}</p>`;
        weather.appendChild(img);
    });
}

function saveCoords(coordsObj) {
    const saveCoord = localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {                 // 객체 key, value 값이 같으면 이렇게 하나만 적어도 된다.
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    alert("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();