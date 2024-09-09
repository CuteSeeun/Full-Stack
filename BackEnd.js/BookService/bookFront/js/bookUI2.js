import {getAllBooks, addBook, getBook, findBook, deleteBook, updateBook, addBookFileUp} from './bookAPI2.js'

const init = () => {
    const btnAll = document.querySelector('#btnAll');
    const btnCreate = document.querySelector('#btnCreate');
    const btnUpdate = document.querySelector('#btnUpdate');

    btnAll.onclick = async () => {
        getAllBooks();
    }

    btnCreate.onclick = () => { //등록 버튼
        const title = document.getElementById('title').value;
        const publish = document.getElementById('publish').value;
        const price = document.getElementById('price').value;
        //도서 이미지 첨부파일값 받기
        const image = document.getElementById('image').files[0]; //files[0]로 받음

        if (!title || !publish || !price) {
            alert('모든 값을 입력해야 한다')
            return;
        }
        //파일 업로드 안할 경우 -> json 데이터로 보낸다
        // const book = { title, publish, price };
        // addBook(book);

        //파일 업로드를 할 경우 -> FormData에 담아서 보낸다
        let formData = new FormData();
        formData.append('title', title);
        formData.append('publish', publish);
        formData.append('price', price);
        if(image){
            //첨부 파일이 있다면
            formData.append('image', image);
        }
        //로그로 폼데이터 확인
        console.log(Array.from(formData.entries()));
        
        addBookFileUp(formData); //업로드할 경우 호출
    }


    //수정한 도서 정보 얻어오기
    btnUpdate.onclick = () => {
        const isbn = document.getElementById('isbn').value;
        const title = document.getElementById('title').value;
        const publish = document.getElementById('publish').value;
        const price = document.getElementById('price').value;

        //유효성 검증
        if (!isbn || !title || !publish || !price) {
            alert("모든 값을 입력해야 한다");
            return;
        }
        if (isNaN(price)) {
            alert('가격은 숫자여야 해요')
            return;
        }
        const tmpBook = { isbn, title, publish, price };
        updateBook(tmpBook);
    }
    const btn = document.querySelector('#btnSearch'); //검색 버튼
    btnSearch.onclick = () => {
        let keyword = document.getElementById('keyword').value;
        if (!keyword) {
            alert('검색할 도서명을 입력하세요');
            document.getElementById('keyword').focus();
            return;
        }
        findBook(keyword);
    }
    getAllBooks();
}

window.getBook = getBook;
window.deleteBook = deleteBook;
//모듈에서 정의된 변수나 함수는 해당 모듈에서만 접근 가능
//모듈에서 export하면 다른 모듈에서 import할 수 있다
//모듈화한 함수를 html에서 사용하려면 window 객체에
//속성으로 등록해줘야 한다
//아니면 dom 이용해서 처리

document.addEventListener('DOMContentLoaded', init)
