//서버 구현 페이지
//이렇게 폴더가 달라지면 모듈을 설치해야 한다
//npm init ==> package.json 으로 설치하면 뭘 설치했는지 알수 있다
//npm i express dotenv morgan --s로 설치
//npm i nodemon  -g

const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const path = require('path')
const cors = require('cors');
//라우터를 require
const bookRouter = require('./routes/bookRouter')
//bookRouter폴더를 먼저 찾고 그 안에 index.js를 찾는다
//폴더가 없으면 bookRouter.js 파일을 찾는다
const userRouter = require('./routes/userRouter')
const naverRouter = require('./routes/naverRouter')

const indexRouter = require('./routes/indexRouter')
const bookDBRouter = require('./routes/bookDBRouter')
const testRouter = require('./routes/testRouter')





const port = process.env.PORT || 3333;


const app = express();
//미들웨어 설정
app.use(cors())//모든 도메인 허용
app.use(express.json())
app.use(express.urlencoded({extends:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

app.use('/', indexRouter)
app.use('/books', bookRouter) //배열 사용
app.use('/api/books', bookDBRouter) //db연동
app.use('/users', userRouter)
app.use('/naver', naverRouter)
app.use('/test', testRouter)
//라우터를 미들웨어로 설정함

//cors 관련 설정 미들웨어 _ npm i cors --s 설치
// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*') //* :모든 도메인 허용
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'); //허용할 메서드 설정
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //허용할 헤더 설정
//     next();
// })

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`); //여기 url에 공백있으면 안된다    
})

