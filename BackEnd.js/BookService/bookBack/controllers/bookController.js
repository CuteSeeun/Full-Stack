//커넥션 풀이 필요해 받아온다
const pool = require('../models/dbPool.js');

//도서정보 등록 처리
exports.createBook = async (req, res)=>{
    const {title, publish, price} = req.body;
    console.log(title, publish, price);
    if(!title || !publish || !price){
        return res.status(400).json({
            message:'제목, 출판사, 가격값이 들어오지 않음'
        })
    }   

    const sql = `insert into book(title, publish, price)
    values(?,?,?)
    `;

    try {
        //?를 in파라미터라고 한다.
    const [result] = await pool.query(sql, [title, publish, price])
    console.log('result: ', result);
    res.json(result) //send랑 json이랑 뭔차이인데
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'DB 에러 발생' + error.message})
        
    }
}

exports.listBook = async (req, res)=>{
    const sql = `select * from book order by isbn desc`;
    try {
        const [data] = await pool.query(sql);
        res.json(data);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//get /api/books/1 -> select * from book where isbn =?
//getBook
exports.getBook = async (req, res)=>{
    const {isbn} = req.params;
    console.log('isbn', isbn);
    const sql = `select isbn, title, publish, 
                 price, image, indate from book where isbn=?`; //*보다 컬럼명을 가져와야 더 빠르다고 한다

    try {
        const [data] =  await pool.query(sql, [isbn]) //물음표가 있을때 대괄호, 그 안에 추춝한 isbn을 넣어준다
        //isbn이 pk이므로 데이터가 있다면 1개 온다
        if(data.length > 0){
            res.json(data[0])
        }else{
            res.json({})
        }
    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
} //여기를 완성하면 라우터 쪽에서 이 얘를 불러줘야 한다. 즉 디비연결하는 부분은 완. 호출하는 쪽도 적어줘야 한다.


//deleteBook()함수 구성해서 내보내기
//delete문 수행
exports.deleteBook = async (req, res)=>{
    const {isbn} = req.params;
    if(!isbn){
        return res.status(400).json({message:'도서 번호가 필요해요'})
    }
    const sql = `delete from book where isbn=?`;
    try {
        const [result] = await pool.query(sql, [isbn]);
        if(result.affectedRows === 0){
            return res.json({message:'삭제할 도서가 존재 안함'})
        }
        res.json({message:`${isbn}번 도서상품을 삭제함`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}