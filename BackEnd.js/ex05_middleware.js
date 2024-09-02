const express = require('express')
const app = express();


/*미들웨어 : 요청과 응답 사이에 추가적인 기능을 하는 중간작업을 하고자 할 때 사용
           ex : 인증처리, 로깅, 예외처리, 세션처리 등

app.use()함수를 사용한다
app.use(미들웨어) : 모든 요청에 미들웨어 실행
app.use('/aaa', 미들웨어) : '/aaa' 요청일 때 미들웨어 실행
app.post('/bbb, 미들웨어') : '/bbb' post 요청일 때 미들웨어 실행
이런 미들 웨어는 여러 개 올 수 있다. 
*/

//이 미들웨어는 로그를 남기는 기능을 간단하게 구현해봤다.
app.use((req, res, next)=>{ //req,res를 받을 수도 아니면 코드처럼 3개를 받을 수 있다
    console.log('Logging...', req.url);
    next();
})

app.get('/', (req, res)=>{
    res.send(`<h2>Hello World~</h2>`)
})

app.get('/bye', (req, res)=>{
    res.send(`<h2>Bye~</h2>`)
})



app.listen(5555, ()=>{
    console.log(`http://localhost:5555`);
    
})