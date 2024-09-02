const express = require('express')

const app = express();
//정적인 파일들을 인식시키도록 static 미들웨어를 사용하자
//express.static() : 정적인 파일들의 경로를 설정할 수 있다.
app.use(express.static(__dirname+'/public')) //<- pubic 내에 정적인 파일(css,image,멀티미디어,js)들이 서버에서 인식된다 즉 브라우저에서 접근 가능해진다
                                             //다만 요청 주소를 보낼 때 public은 포함하면 안된다
                                             //http://localhost:5555/images/login.png 라면
                                             //http://localhost:5555/index.html
                                            


app.get('/index', (req, res) => {
    //fs.readFile()이용해서 'public/index.html'을 가져와 보여주기
    //대신 res.sendFile()을 사용할 수 있다
    console.log(__dirname+'/public/index.html');
    res.sendFile(__dirname+'/public/index.html');
})

//'/login' ==> 'public/images/login.png' 이미지를 브라우저에 출력하기
app.get('/login', (req, res)=>{
    // res.sendFile(__dirname + '/public/images/dog1.png');
    const str = `<h1>Login Page</h1>
    <img src="/images/dog1.png">
    `
    //서버는 <img src="/public/images/login.png">  이 경로를 알지 못한다. 그래서 인식을 시켜줘야 이미지가 나온다
    res.send(str);
})

//'/board' ==> 'public/images/login.png' 이미지를 브라우저에 출력하기
app.get('/board', (req, res)=>{
    res.sendFile(__dirname+'/public/images/dog2.png');
})

app.listen(5555, ()=>{
    console.log(`http://localhost:5555`);
    
})