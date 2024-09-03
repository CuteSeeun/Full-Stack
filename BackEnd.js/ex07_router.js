//이 파일은 서버 쪽에서 데이터를 받는 방법을 구현한 것

const express = require('express')
const app = express();


//미들웨어 설정
app.use(express.static(__dirname+"/public"))
//http://localhost:7777/main.html로 접근 가능
app.use(express.json())//json 형태도 받을 수 있다. application/json형태의 요청 데이터를 받도록 미들웨어 설정
//위 코드 때문에 json 데이터를 받을 수 있는거다
app.use(express.urlencoded({extended:false})) //false를 주면 쿼리스트링으로 파싱을 한다. true로 주면 큐에스라는 모듈로 파싱한다
//userId=a&userPw=b 식으로 데이터가 올 때 요청의 본문을 파싱하도록 하는 미들웨어
/*Content-Type이 'application/x-www-form-relencoded'인 요청
  extended:false로 설정함녀 querystring모듈을 이용해서 파싱한다
  true로 설정하면 qs 모듈을 이용해서 파싱한다
*/



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

//get방식으로 singnin 요청이 들어오면 res.sendFile()이용해서 signin.html 보여주기
app.get('/signin', (req, res)=>{ 
    res.sendFile(__dirname+'/public/signin.html')
})

app.get('/signinProc', (req, res) => {
    //query스트링을 추출해서
    //응답을 보내주되
    //id가 killer라는 내용을 가지고 있으면 405 상태 코드 보여주고 
    //killer를 제외한 id면 환영합니다 보여주기

    // const userId = req.query.userId; //쿼리 스트링에서 id값을 추출
    // if(userId === "killer"){

    // }
    const {userId, userPw} = req.query;
    console.log(userId, userPw);
    if(userId === "killer"){
        res.status(405).send(`<h3 style='color : red'>접근 금지</h3>`);
    }else{
        res.send(`<h3 style='color:maroon'>환영합니다 ${userId}</h3>`)
    }
})

app.get('/signin2', (req, res)=>{ 
    res.sendFile(__dirname+'/public/signin2.html')
})

//post 방식의 요청 처리
//request의 body 부분에 데이터를 포함시켜 요청을 보낸다 (그럼 바디를 추출할 수 있어야 한다)
app.post('/signinProc', (req, res) => {
    console.log(req.body); //post방식의 데이터를 받을 때 req.body를 이용
    const {userId, userPw} = req.body;
    if(userId === "killer"){
        res.status(405).send(`<h3 style='color : red'>접근 금지</h3>`);
    }else{
        res.send(`<h3 style='color:green'>환영합니다 ${userId}</h3>`)
    }
})

app.post('/signinProc2', (req,res)=>{
    const uid = req.body.userId;
    const upw = req.body.userPw;
    if(uid==='killer'){
        res.json({'status':405, 'message':'Fail, killer는 접근 불가'})
        //json 형태의 응답을 보내고자 할 때는 res.json()함수를 이용
    }else{
        res.json({'status':200, 'message': `${uid}님 환영합니다`})
    }
})

//없는 요청을 보낼 때
app.get('*', (req, res) => { //이는 위의 요청들을 제외한 모든 요청들을 받는다
    res.status(404).send(`<h1>404-해당 페이지는 없습니다</h1>`)
}) 


//서버 시작 코드
app.listen(7777, ()=>{
    console.log(`http://localhost:7777`);
})