const express = require('express')
const app = express();
const http = require('http')

//미들웨어 여러 개 사용하는 예제

app.use((req, res, next)=>{ 
    console.log('1번째 미들웨어 요청 처리');
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write(`<h1>Hello Express Middleware</h1>`);

    next();//다음 미들웨어로 가도록 호출
})
app.use((req, res, next) => {
    console.log(`2번째 미들웨어 요청 처리`);
    req.user='king';
    next();
})
app.use((req, res, next)=>{
    console.log('3번째 미들웨어 요청 처리');
    res.write(`<h2 style='color: red'>${req.user}</h2>`); //write를 써야 브라우저에 나타난다
    next();
    
})

app.get('/', (req, res)=>{
    res.write(`<h1>get방식으로 '/'로 요청 들어옴</h1>`)
    res.end();
})

app.get('/bye', (req, res)=>{
    res.end(`<h2>Bye~</h2>`)
})

http.createServer(app)
.listen(7777, ()=>{
    console.log(`http://localhost:7777`);
    
})

// app.listen(5555, ()=>{
//     console.log(`http://localhost:5555`);
    
// })