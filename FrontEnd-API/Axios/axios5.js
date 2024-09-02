import axios from 'https://cdn.skypack.dev/axios'

const locationAlert = document.querySelector('#location')
const weatherAlert = document.querySelector('#weather')
const errorAlert = document.querySelector('#error')

const showError = message => {
    errorAlert.textContent = `Error : ${message}`;
    errorAlert.style.display = 'block' //none의 반대는 block 혹은 인라인 블락
}

const showLocation = (lat, long, addr) => {
    locationAlert.innerHTML = `
    <h4>Latitude: ${lat}, Longitude: ${long}</h4>
    <h4>Address: ${addr}</h4>
    `;
    locationAlert.style.display = `block`;
}

const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async(position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                //Debugging logs
                console.log(`Laatitude: ${lat}, Longitude: ${long}`);

                if (lat && long) {//위도 경도 가져와서
                    const address = await fetchAddress(lat, long); //위도 경도 지역주소 문자열로 얻기
                    showLocation(lat, long, address);//현재 위치정보 출력 함수
                    fetchWeather(lat, long);//axios로 날씨 정보 받아오는 함수
                } else {
                    showError('Location data is incomplete.');
                }
            },
            (error) => {
                showError('Geolocation error: ' + error.message);
            }
        );
    } else {
        showError('Geolocation is not supported by this browser.');
    }
};

//위도, 경도 값으로 해당 지역정보를 문자열로 받아오는 함수
const fetchAddress = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    try{
        const response = await axios.get(url);
        // const {display_name} = response.data;
        // return display_name;

        //세부정보 뽑아오기
        const {country, city, borough} = response.data.address;
        const addr = `${country} ${city} ${borough}`;
        return addr;
    }catch(error){
        showError('주소 가져오기 실패: ' + error.message)
        return "Unknown Location"
    }
}

//오픈웨더 api랑 연동
const fetchWeather = async(lat, long) =>{
    console.log(lat, long);
    const url = `https://api.openweathermap.org/data/2.8/onecall?lat=37.5390833&lon=126.9023575&exclude=hourly,daily,minutely&appid=58fabe5c7b978a03de22bb490adfe39a`
    const response = await axios.get(url)
    console.log(response.data);

    //timezone, temp, main|description, icon 데이터 추출해서
    //온도가 캘빈단위 -> 섭씨로 변환 : K - 273.15
    //weatherAlter에 출력해보기 

    /* 내가 한거
    const data = response.data; <- 이거 안써줘서 에러 난듯?

    const timezone = response.data; //data.timezone
    const temp = (response.data.current - 273.15).toFixed(1); //data.current.temp
    const description = response.data.current.weather[0].description;//data.current.weather[0].
    const icon = response.data.current.weather[0].icon; //data.current.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherAlter = document.querySelector('#weather');
    weatherAlter.innerHTML = `
        <h4>${timezone}</h4>
        <h4>${temp}</h4>
        <h4>${description}</h4>
        <img src="${iconUrl} alt="${icon}"/>
    `
    weatherAlter.style.display = 'block';
    */

    //선생님이 한거
    const {timezone} = response.data;
    const {temp} = response.data.current;
    const {description, icon} = response.data.current.weather[0]; //날씨가 배열인데 하나밖에 없어서 인덱스는 0으로 함
    //추출한 데이터를 웨더라는 함수라고 하자
    showWeather(timezone, temp, description, icon);

}

const showWeather = (timezone, temp, description, icon) => {
    const cw = temp - 273.15; //섭씨로 변환
    weatherAlert.innerHTML = `
    <h4>Timezone: ${timezone}</h4>
    <h4>Temparature: ${cw.toFixed(2)}</h4> //to.Fixed는 소수점 자리의 갯수를 나타낸다
    <h4>Description: ${description}</h4>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    `
    weatherAlert.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', getCurrentLocation);//돔이 로드되면 핸들러 함수(getCurrentLocation())를 불러줘
