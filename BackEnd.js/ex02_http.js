const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res)=>{ //서버 생성
    if(req.url == '/'){
        //public/index.html 파일을 읽어서 브라우저에 출력

        //fs의 readFile() 이용해서 읽은 내용을 브라우저에 출력 - 즉 21줄까지 http 서버를 구현한 것이다
        const filePath = path.join('public', 'index.html')//경로 만들기
        console.log('filePath: ', filePath); //public/index.html 이렇게 경로를 만들어줄거다
        console.log(path.resolve(filePath)); //절대 경로
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            if(err){
                console.log('파일 없음', err);
                
                throw err;
            }
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.write(data)
            res.end();
        })
    }else if(req.url=='/login'){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write(`<h1 style='color:green'>Login Page</h1>`)
        res.write(`<a href='/'>index페이지로</a>`)
        res.end();
    }else if(req.url == '/board'){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
        res.write(`<a href='/'>index페이지로</a>`)
        res.write(`<h1 style='color:maroon'>BoardPage</h1>`)
        // res.end(`<h1 style='color:maroon'>BoardPage</h1>`)
        res.end();

    }
}).listen(3333, ()=>{
    console.log(`http://localhost:3333`);
})