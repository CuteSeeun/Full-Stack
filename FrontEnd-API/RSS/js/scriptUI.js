//이벤트 핸들러

import { getNews } from "./api.js";

const init = () => {
    alert('init');
    const btn1 = document.querySelector('#btn1')
    const btn2 = document.querySelector('#btn2')
    
    const url = `https://www.hankyung.com/feed/it` 

    const proxy_url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.hankyung.com%2Ffeed%2Fit&api_key=jvm9lilygpdoy4l6rcg0otcxcdb9s4wxzhxjl22z`

    btn1.addEventListener('click', () => {
        axios.get(url)
            .then(response => alert(response))
            .catch(error => alert(error))
    })
    btn2.addEventListener('click', ()=>{
        getNews(proxy_url)
        .then(data => showNews(data))
    })

    const showNews = (data) => {
        const list = data.items; 
        const pubDate = list[0].pubDate;
        document.querySelector('#today').innerText = pubDate;
    
        const result = document.querySelector('#newsContainer')
    
        let str = '<ul>';
        for(let i=0; i<list.length; i++){
            const item = list[i]
            console.log(item);
            const {title, link} = item; 
            str += `
                <li>
                    <a href="${link}" target="_blank">${title}</a>
                </li>
            `
        }
        str += '</ul>'
        result.innerHTML = str;
    }
}
document.addEventListener('DOMContentLoaded', init)