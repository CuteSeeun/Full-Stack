//express 외장 모듈을 설치해서 웹서버를 구축해보자
//http는 내장모듈. 가벼운 장점은 있지만 기본 기능만 제공한다. 
//express는 외장모듈. 라우팅, 미들웨어, 에러 처리 등 다양한 기능을 제공

//express을 npm으로 설치해보자
//npm install express --save  = npm i express --s

const express = require('express')
const app = express(); //express는 send라는 함수만 쓰면 아까 http에서 응답 헤더 쓴거 생략할 수 있다

app.get('/', (req, res)=>{
    res.send(`<h1>Hello Express</h1>`) 
    //send는 express가 제공하는 함수이다. 응답 본문 전송, 상태코드, 컨텐 타입을 자동으로 설정한다
})

app.get('/killer', (req, res)=>{ //killer는 접근 불가능한 부분이라고 치면
    res.status(405).send('Forbidden 접근 금지');
})

app.listen(5555, ()=>{
    console.log(`http://localhost:5555`);
    
})
