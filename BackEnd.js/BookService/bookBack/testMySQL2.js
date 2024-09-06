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

//MySQL 커넥션 풀 설정
const pool = mysql.createPool({
    host:'localhost',
    user:'kosta',
    password:'1234',
    port:3306,
    database:'studydb',
    connectionLimit: 10, //최대 커넥션 수 10개를 미리 준비한다
    waitForConnections: true
})

app.get('/', async (req, res)=>{
    const sql = `select * from user`;
    try{
        const [data] = await pool.query(sql);
        //mysql2는 연결자원 반납 알아서 자동으로 처리한다
        res.send(data);
    }catch(error){
        res.status(500).send(err.message);
    }
})

app.listen(port, ()=>{
    console.log(`http://localhost${port}`);
    
})