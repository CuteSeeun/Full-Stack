const getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                //Debugging logs
                console.log(`Laatitude: ${lat}, Longitude: ${long}`);

                if (lat && long) {
                    //여기서 id가 result인 곳에 위도 경도 출력하세요
                    const result = document.querySelector('#result')
                    result.innerHTML = `Latitude : ${lat}, Longitude : ${long}`
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


const showError = (message) => {
    alert(message);
}