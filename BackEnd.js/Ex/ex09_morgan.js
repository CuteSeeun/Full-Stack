//모르간 미들웨어 사용해보기
//npm i morgan --s 로 설치하기
//모르간 미들웨어는 로그를 남기는 미들웨어로 서버를 모니터링하고 디버깅하는 용도로 사용된다

const express = require('express')
const morgan = require('morgan')
require('dotenv').config();
const port = process.env.PORT || 3333;
const app = express();

//미들웨어 설정
morgan.format('myformat', ':method  :url :status :response-time ms') //요청방식, 요청url, 상태코드, 걸린시간
app.use(morgan("common")) //이는 이미 있는 포맷 사용하기
//내가 만든 포맷 써보기 _ 사용자 정의 로그 형식을 설정하고자 할 때 format('포맷이름', '포맷돌')
app.use(morgan('myformat'))
/* 사용자 정의 로그 형식
    주요 morgan 포맷 토큰
    :method: HTTP 메소드 (예: GET, POST)
    :url: 요청된 URL (예: /home)
    :status: HTTP 응답 상태 코드 (예: 200, 404)
    :response-time: 요청 처리에 걸린 시간 (밀리초 단위)
    :res[content-length]: 응답의 콘텐츠 길이 (바이트 단위)
*/


/* format --------------------------
'combined': Apache combined 로그 형식 / combined라는 옵션을 쓰면 상세하게 남긴다
'common': Apache common 로그 형식
'dev': 개발 중 사용하기 좋은 형식
'short': 짧은 로그 형식
'tiny': 더 간단한 로그 형식
*/


// '/' 라면 Hello
app.get('/', (req, res)=>{ //앱을 통해서 get방식 요청
    res.send(`<h1>Hello</h1>`)
}) 
app.get('/post', (req, res)=>{ //앱을 통해서 get방식 요청
    res.send(`<h1>post</h1>`)
}) 
app.get('/mypage', (req, res)=>{ //앱을 통해서 get방식 요청
    res.send(`<h1>MyPage</h1>`)
}) 

// 서버 동작
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})