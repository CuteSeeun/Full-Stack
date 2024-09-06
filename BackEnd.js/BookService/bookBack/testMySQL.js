//npm i mysql2 --s

const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise') //mysql2의 promise API 사용할 수 있다
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3333;

//미들웨어 설정
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let db;

/*
app.get('/', (req, res)=>{
    res.redirect('/dbtest'); //redirect(url) : 페이지를 이동시키는 함수
})
*/

/*
app.get('/dbtest', async (req, res)=>{
    try {
        db = await mysql.createConnection({ //db서버에 연결
            host : 'localhost',
            user : 'kosta',
            password : '1234',
            database : 'studydb',
            port : 3306
        })
        res.send(`<h1>db연결 성공: kosta 계정. studyDB 데이터베이스 사용</h1>`)
    } catch (error) {
        console.error('db접속 실패: ' , error);
        // alert('db 연결 실패: '+error)
    }
})
*/

(async()=>{
    try {
        db = await mysql.createConnection({ //db서버에 연결
            host : 'localhost',
            user : 'kosta',
            password : '1234',
            database : 'studydb',
            port : 3306
        })
        // res.send(`<h1>db연결 성공: kosta 계정. studyDB 데이터베이스 사용</h1>`)
        console.log('db접속 성공');
        const sql= `select idx, name, userid, tel, indate from user where idx=11`;
        const [data] = await db.query(sql);
        console.log(data)
        
    } catch (error) {
        console.error('db접속 실패: ' , error);
        // alert('db 연결 실패: '+error)
    }
})();

app.get('/', (req, res)=>{
    res.redirect('/dbtest'); //주어진 url로 이동하는 함수이다.
})

app.get('/dbtest', async (req,res)=>{
    try {
        const  sql = `select * from user order by idx desc`;
        const [data] = await db.query(sql) //객체를 받을 때는 중괄호, 배열을 받을 때는 []쓴다
        console.log(data);
        db.end(); // db 연결 끊기
        
        res.send(data);
    } catch (error) {
        res.status(500).send(err.message)
    }
})


app.listen(port, ()=>{
    console.log(`http:localhost:${port}`);
    
})