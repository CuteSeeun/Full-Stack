//커넥션 풀이 필요해 받아온다
const pool = require('../models/dbPool.js');

//도서정보 등록 처리
exports.createBook = async (req, res)=>{
    const {title, publish, price} = req.body;

    //첨부파일
    const image = req.file? req.file.filename : 'noimage.jpg';
    console.log(image);
    

    console.log(title, publish, price);
    if(!title || !publish || !price){
        return res.status(400).json({
            message:'제목, 출판사, 가격값이 들어오지 않음'
        })
    }   

    const sql = `insert into book(title, publish, price, image)
    values(?,?,?,?)
    `;

    try {
        //?를 in파라미터라고 한다.
    const [result] = await pool.query(sql, [title, publish, price, image])
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

exports.updateBook = async (req, res)=>{
    // isbn 값 받기 -> req.params
    const {isbn} = req.params
    //수정한 도서 정보 데이터 받기 -> req.body
    let {title, publish, price} = req.body;

    title =title.trim(); //앞뒤 공백문자 제거 (백엔드에서 처리하도록 함)
    publish = publish.trim();
    

    if(!isbn || !title || !publish || !price){
        return res.status(400).json({message:'제목, 출판사, 가격 모두 입력해야 한다.'});
    }
    const sql = `update book set title=?, publish=?, price=? where isbn=?`;
    try{
        const [result] = await pool.query(sql, [title, publish, price, isbn]);
        console.log('result:', result);

        if(result.affectedRows === 0){
            return res.status(404).json({message: '해당 도서는 존재하지 않음'})
        }
        
        res.json({message:'success'})
    }catch(error){
        console.error(error);
        res.status(500).json({message:error.message}); //클라이언트에게 json형식으로 응답보내려고
    }
}


//도서 제목으로 검색  /api/books/search?keyword=Node
                //이를 getBook 함수 위에 위치해야 한다고 하는데 왜냐?
exports.findBook = async (req, res)=>{
    let {keyword} = req.query;
    console.log(keyword);
    keyword = keyword.trim();//앞뒤 공백 문자 제거

    if(!keyword){
        return res.json({message:'검색어를 입력해야 한다'});
    }
    try {
        const sql = `select * from book where title like ? order by isbn desc`; //통째로 물음표 처리해야 한다. '%?%' 이렇게 하면 안된다
        const [data] =  await pool.query(sql, [`%${keyword}%`]); //키워트 안에 키워드만 넣으면 안된다
        res.json(data);
    } catch (error) {
        console.log(error);
        
        res.json({message:error.message})
    }
}
function showError(error){

}