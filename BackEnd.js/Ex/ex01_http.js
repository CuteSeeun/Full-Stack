//ex01_http.js

//모듈 가져오기
const http = require('http');

//http 이용해서 서버 만들기
const server = http.createServer();

//브라우저에 접속할 때 발생하는 이벤트가 커넥션
server.on('connection', function(socket){ //접속하면 뭐가 들어오는게 그걸 socket으로 이름 정해보자
    console.log('Connection On');

    //서버의 ip주소
    const serverIP = socket.address();
    console.log(serverIP); //::1 => IPv6의 루프백 주소를 나타내는 것으로 로컬호스트를 의미함
                           //       IPv4 주소의 127.0.0.1에 해당하는 주소
    
    //클라이언트 IP주소
    const clientIP = socket.remoteAddress;
    console.log(clientIP + "님이" +serverIP.address+ "서버에 접속했어요");
    
})

//웹서버 종료 시 발생
server.on('close', function(){
    console.log('Close On : 서버가 종료됨');
})

//브라우저(클라이언트)가 요청을 보내면 request이벤트 발생
//핸들러함수에 request/response가 매개변수로 들어온다
server.on('request', function(req, res){
    console.log('Request On: 클라이언트의 요청이 들어옴');
    
    //res: 응답과 관련된 객체 _ 이를 이용해 응답을 보내보자 이는 브라우저와 연결되어 있다
    res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'}); //헤더에 쓰기
    res.write('<h1>Hello Node Server..</h1>') //body에 쓰기
    res.write(`<h2>안녕하세요</h2>`);
    res.end()//응답을 모두 보냈다는 의미. end()호출될 때 브라우저에 응답을 전송한다.
})

server.listen(3333, function (){
    console.log('http://172.30.1.70:3333 에서 서버가 시작됨'); //포트 3333에서 사용자의 요청을 기다리고 있음
})

//3초 후에 서버 종료시켜보자 => close 이벤트 발생
// setTimeout(()=>{
//     server.close(()=>{
//         console.log('server shutdown');
        
//     })
// }, 3000)