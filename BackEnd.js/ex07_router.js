//이 파일은 서버 쪽에서 데이터를 받는 방법을 구현한 것

const express = require('express')
const app = express();

app.use(express.static(__dirname+"/public"))

//논리적인 경로를 주기
app.get('/main', (req, res)=>{
    res.sendFile(__dirname+'/public/main.html');
})

/* 클라이언트가 보낸 데이터 받는 방법
   1. 쿼리스트링으로 보낸거 받을 때는 req.query로 받는다 (get방식)
   2. 요청 경로에 포함된 데이터 받을 때는 req.params로 받는다 ()
   3. post방식으로 요청된 데이터 받을 때는 req.body로 받는다. 이는 별도의 설정이 필요하다 express body-parser
*/

//app에 링크 거는 방식은 get이다
app.get('/api/users', (req, res)=>{
    //page, per_page 값 받기
    console.log('req.query: ', req.query);
    const {page, per_page} = req.query;
    //req.query.page , req.query.per_page 접근해도 된다.
    const str=`<h3>page: ${page}</h3>
    <h3>per_page: ${per_page}</h3>
    해당 페이지의 user 정보를 가져와 보여줄게요
    <br><a href='/main'>/main</a></br>
    `
    res.send(str)
})
app.get ('/api/board/:no', (req, res)=>{ //no는 게시글을 받겟다, 동적 세그먼트이다
    console.log('req.params: ', req.params);
    //req.params.no
    const {no} = req.params
    res.send(`<h3>${no}번 게시글 보여드림</h3>`)
}) 

app.listen(7777, ()=>{
    console.log(`http://localhost:7777`);
})