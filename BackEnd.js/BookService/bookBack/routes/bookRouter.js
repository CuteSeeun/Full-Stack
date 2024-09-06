const express = require('express');
const router = express.Router(); 
//express.Router() ==> 독립적인 라우터
//미니 앱


//더미 데이터 -> 향후 데이터베이스와 연동
const books=[
    {isbn:1111, title:'Node 교과서', publish:'길벗', price:40000, image:'a.jpg'},
    {isbn:1112, title:'100억 부자되기', publish:'ebs', price:35000, image:'b.jpg'},
    {isbn:1113, title:'아빠가된 일진짱', publish:'해찬', price:40000, image:'c.jpg'},
]

router.get('/', (req, res)=>{
    res.json(books);//브라우저에 json데이터 쓰기
})

//GET /search?keyword=node
router.get('/search', (req, res)=>{
    const {keyword} = req.query;
    console.log(keyword);
    let lower_key = keyword.toLowerCase(); //소문자로 변경
    const findBooks = books.filter(b => b.title.toLowerCase().includes(lower_key))
    console.log(findBooks);
    

    if(!findBooks|| findBooks.length == 0){
        res.status(404).send()
    }else{
        res.json(findBooks)
    }
})

//Create : 새로운 도서정보 등록
//isbn:일련번호 title:'MySQL데이터베이스', publish:'에이스출판사', price:25000, ''d.jpg
router.post('', (req, res)=>{
    let isbn = 1111+books.length;
    console.log(`isbn: ${isbn}`);
    const {title, publish, price, image} = req.body;
    console.log(title, publish, price, image);
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

//Read : 특정 isbn의 도서 검색 GET /1111
router.get('/:isbn', (req, res)=>{
    //req.params.isbn
    const {isbn} = req.params;
    console.log('isbn: ', isbn, 'typeof: ', typeof isbn);

    //등호 3개 쓰기 위해 타입 바꾸기 
    books.forEach((item, index) => {
        //item: 도서객체
        if(item.isbn == parseInt(isbn)){
            return res.json(item);
        }
    }) 
})

//DEELETE 삭제처리 : delete /1111
router.delete('/:isbn', (req, res)=>{
    const isbn = req.params.isbn;
    const index = books.findIndex(b=> b.isbn === Number(isbn))
    if(index !== -1) {
        //삭제하고
        const delArray = books.splice(index, 1);
        res.json(delArray[0]);
    }else{
        res.status(404).send('너가 찾는 도서는 없어');
    }

})

//수정하기
router.put('/:isbn', (req, res)=>{
    const {isbn} = req.params 
    const {title, publish, price} = req.body; 
    const findIndex = books.findIndex(b => b.isbn === Number(isbn));
    if(findIndex !== -1){
        const updatedBook = {...books[findIndex], title, publish, price}
        books[findIndex] = updatedBook;
        res.json(updatedBook);
    }else{
        res.status(404).send('너가 찾는 도서를 찾을 수 없다.');
    }
})



module.exports = router;
//exports 라는 전역 객체 이용하거나
//module.exports 로 이용해 내보낼 수 있다. 
//exports.add = function(){} 이렇게 하면 여러 개 내보낼 수 있다