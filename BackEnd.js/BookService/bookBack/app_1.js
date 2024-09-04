//서버 구현 페이지
//이렇게 폴더가 달라지면 모듈을 설치해야 한다
//npm init ==> package.json 으로 설치하면 뭘 설치했는지 알수 있다
//npm i express dotenv morgan --s로 설치

const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const path = require('path')

const port = process.env.PORT || 3333;

const app = express();
//미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({extends:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))


//cors 관련 설정 미들웨어
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*') //* :모든 도메인 허용
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'); //허용할 메서드 설정
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //허용할 헤더 설정
    next();
})


//더미 데이터 _ 모든 도서 가져올거임(이 부분 나중에 디비로 바꿀거임)
const books=[
    {isbn:1111, title:'Node 교과서', publish:'길벗', price:40000, image:'a.jpg'},
    {isbn:1112, title:'100억 부자되기', publish:'ebs', price:35000, image:'b.jpg'},
    {isbn:1113, title:'아빠가된 일진짱', publish:'해찬', price:40000, image:'c.jpg'},
]

//Read : 모든 도서정보 조회
app.get('/books', (req, res)=>{
    res.json(books);//브라우저에 json데이터 쓰기
})

//Create : 새로운 도서정보 등록
//isbn:일련번호 title:'MySQL데이터베이스', publish:'에이스출판사', price:25000, ''d.jpg
app.post('/books', (req, res)=>{
    let isbn = 1111+books.length;
    console.log(`isbn: ${isbn}`);
    //post방식일 때 데이터 얻기 : req.body
    const {title, publish, price, image} = req.body;
    console.log(title, publish, price, image);
    //books 배열에 추가 _ push쓰면 됨
    const newBook = {
        isbn, //isbn:isbn과 동일
        title, //title:title
        publish, 
        price,
        image
    }
    books.push(newBook);
    res.status(201).json(newBook) //200번대 성공
})

//Read : 특정 isbn의 도서 검색 GET /books/1111
app.get('/books/:isbn', (req, res)=>{
    //req.params.isbn
    const {isbn} = req.params;
    console.log('isbn: ', isbn, 'typeof: ', typeof isbn);
    
    //isbn과 동일한 도서가 있는지 books에서 검색해서 
    //있으면 해당 도서정보를 json형태로 브라우저에 출력
    //없으면 404상태 코드 전송

    /* 내가 한거
    const book = books.find(b => b.isbn ==isbn); //조건을 충족하는 첫번째 요소를 반환함
    if(book){
        res.json(book); //여기서 왜 return 을 쓸 필요가 없을까
    }else{
        res.status(404).send('Book not found');
    }  */

    /*선생님이 한거
    books.forEach((item, index) => {
        //item: 도서객체
        if(item.isbn == isbn){
            return res.json(item);
        }
    })
    return res.status(404).send(); */

    //findIndex로 찾기 _ 이는 검색한 인덱스 번호를 반환한다
    /*
    const index = books.findIndex(b=> b.isbn === Number(isbn))
    if(index !== -1) {
        res.json(books[index]);
    }else{
        res.status(404).send('업어 얌마');
    }
    */

    //등호 3개 쓰기 위해 타입 바꾸기 
    books.forEach((item, index) => {
        //item: 도서객체
        if(item.isbn == parseInt(isbn)){
            return res.json(item);
        }
    })
    
    //내가 한거 선생님이 한거 두개 다 작동 잘 됨(포스트맨에서 확인함)
    //근데 ===이렇게 하면 모두 에러 나고 ==쓰면 에러 안남
    //===으로 쓰고 싶으면 문자열로 바꿔주든 문자열로 바꿔주든 한다. 
})

//DEELETE 삭제처리 : delete /books/1111
app.delete('/books/:isbn', (req, res)=>{
    const isbn = req.params.isbn;
    const index = books.findIndex(b=> b.isbn === Number(isbn))
    if(index !== -1) {
        //삭제하고
        const delArray = books.splice(index, 1);
        res.json(delArray[0]); //나는 여기서 delArray를 보여줬어야 한다고 생각했다. 그런데 get요청하면 전체 목록이 나오는데 굳이 그럴 필요 있는가? 무엇이 삭제된건지를 확인하면 된다.
        
        //삭제한 도서정보를 갖는 배열을 반환
    }else{
        res.status(404).send('너가 찾는 도서는 없어');
    }

})

//수정하기
app.put('/books/:isbn', (req, res)=>{
    const {isbn} = req.params //수정할 도서의 isbn
    const {title, publish, price} = req.body; //수정할 도서 정보 추출
                                            //put, post => req.body 추출
    //수정할 도서가 있는지 검색해서 있으면 해당 도서의 title, publish, price 값을 변경
    //수정된 도서 정보를 json으로 반환
    //없으면 404
    //원본 수정
    /*
    const findIndex = books.findIndex(b => b.isbn === Number(isbn));
    if(findIndex !== -1){
        books[findIndex].title = title; 
        books[findIndex].publish = publish;
        books[findIndex].price = price;
        res.json(books[findIndex])
    }else{
        res.status(404).send();
    }  */

    //수정 _ 객체의 속성을 업데이트 
    //복사본 수정
    const findIndex = books.findIndex(b => b.isbn === Number(isbn));
    if(findIndex !== -1){
        const updatedBook = {...books[findIndex], title, publish, price}
        //스프레드 연산자(전개 연산자)로 검색한 도서를 나열.
        // 나열 후 수정할 속성 값을 넣어줫을 때 동일한 속성명을 가진 것이 있으면 덮어쓰기 한다.

        books[findIndex] = updatedBook;
        res.json(updatedBook);
    }else{
        res.status(404).send('너가 찾는 도서를 찾을 수 없다.');
    }


    /* 내가 한거 
    const index = books.findIndex(b => b.isbn === Number(isbn));
    if(index !== -1){
        // 도서가 존재하면, 해당 도서의 정보를 수정
        books[index].title = title !== undefined ? title : books[index].title;
        books[index].publish = publish !== undefined ? publish : books[index].publish;
        books[index].price = price !== undefined ? price : books[index].price;

        // 수정된 도서 정보를 JSON으로 반환
        res.json(books[index]);
    }else{
        res.status(404).send('너가 찾는 도서를 찾을 수 없다.');
    } */

})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`); //여기 url에 공백있으면 안된다    
})

