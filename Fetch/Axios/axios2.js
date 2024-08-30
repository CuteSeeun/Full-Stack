const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')

//한경닷컴 서버로 직접 요청을 보내보자 => 에러 발생(cors 발생)
const url = `https://www.hankyung.com/feed/it` //원래 도메인이 다르면 서버에서 요청 막는다
//즉 서버 시스템에 따라 다르다
//보통은 도메인이 다르면 cors 발생


//중간 대리 서버(proxy server)를 이용해서 한경닷컴에 요청을 보내 응답을 받는다.
//이 대리 서버는 받은 응답(xml)을 json으로 변환(convert)해서
//우리에게 응답을 보내준다
const proxy_url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.hankyung.com%2Ffeed%2Fit&api_key=jvm9lilygpdoy4l6rcg0otcxcdb9s4wxzhxjl22z`

//cors 발생 버튼
btn1.addEventListener('click', () => {
    axios.get(url)
        .then(response => alert(response))
        .catch(error => alert(error))
})

//proxy server 버튼
btn2.addEventListener('click', () => {
    axios.get(proxy_url, {
        params: {count:20} //쿼리 스트링에 파라미터를 추가하는 속성 
    })
        .then(response => {
            // alert(JSON.stringify(response))
            showNews(response.data)
        })
        .catch(error => alert(error))
})

const showNews = (data) => {
    const list = data.items; //배열

    //날짜
    const pubDate = list[0].pubDate;
    document.querySelector('#today').innerText = pubDate;

    console.log('list.length: ', list.length);
    const result = document.querySelector('#newsContainer')
    //ul, li 태그 이용해서 title 출력하고 해당 title에 link 걸어주삼
    let str = '<ul>';
    for(let i=0; i<list.length; i++){
        const item = list[i]
        console.log(item);
        const {title, link} = item; //비구조화 할당 _ title이랑 link만 필요하다
        str += `
            <li>
                <a href="${link}" target="_blank">${title}</a>
            </li>
        `
    }
    str += '</ul>'
    result.innerHTML = str;


    //위 코드를 map으로 만들어보기. react는 map으로 한다.
    //배열.map(콜백함수) _ 반환값은 새로운 배열이다
    //배열을 문자열로 변환하려면 : 배열.join(구분자) => 문자열을 반환
    /* 
    let str = '<ul>';
    const newArr = list.map(item => { 여기서 item이 뉴스 각각이다
            //item은 배열에 저장된 값
            const {title, link} =item;
            return `
              <li>
                   <a href="${link}" target="_blank">${title}</a>
              </li>
            `
        })
    반환되는 newArr은 map()이 반환하는 배열이다. str += newArr;이런 식으로 적으면 안된다.(나오긴 한데 왤까)
    str += newArr.join(' ') : ()안에는 구분자로 빈 문자열을 쓴거다 이는 배열에 저장된 값들을 문자열로 만들어서 추가한거다
    str += '</ul>'
    result.innerHTML = str;


    */

}
