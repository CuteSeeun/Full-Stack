//api 요청

import axios from 'https://cdn.skypack.dev/axios';

const getNews = async (urlProxy) => {
    try{
        const response = await axios.get(urlProxy, {
            params: {count:15}
        })
        return response.data;
    }catch(error){
        alert('Proxy API 호출 중 에러: ' + error)
    }
}

export {getNews}