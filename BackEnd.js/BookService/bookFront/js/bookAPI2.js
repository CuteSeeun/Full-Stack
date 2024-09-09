const baseUrl = `http://localhost:7777`;
const url = baseUrl + '/api/books';

//에러 처리 함수
const showError = (error)=>{
    let msg = document.getElementById('resultMessage');
    msg.innerHTML = `<h3>${error}</h3>`;
    msg.style.display = 'block';
}


const findBook = async (keyword) => {
    // alert(keyword);
    const url2 = url+`/search?keyword=${keyword}`;//url 만듦
    try {
        const response = await fetch(url2);
        const data = await response.json();



        // // 응답이 성공적(200번대)인지 확인
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // // JSON 변환
        // const data = await response.json();
        // if (!Array.isArray(data)) {
        //     throw new Error("Returned data is not an array");
        // }


        renderBooks(data);
    } catch (error) {
        showError(error)
    }

}

const addBook = async (newBook) => {
    try {
        //fetch()이용해서 백엔드에 요청보내기. post방식으로
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
        //받은 응답(새로 등록된 도서 정보)을 콘솔에 찍어보기
        const data = await response.json();
        alert(JSON.stringify(data))

        //모든 도서 정보 가져오기
        getAllBooks();
    } catch (error) {
        console.error('Error ', error);
        alert(error)

        showError(error)
    }
}

const addBookFileUp = async (formData)=>{
    try{
        const response = await fetch(url, {
            method:'post', 
            body:formData //바디 부분에 폼데이터를 전달하면 된다
        })
        //FormData 객체를 사용하면 브라우저가 자동으로 Content-Type 헤더를 설정하면서 적절한 boundary를 추가한다
        // => multipart/form-data 형식으로 알아서 전송
        const data = await response.json();
        getAllBook();
        clearInput();
    }catch(error){
        showError(error);
    }
}


const clearInput = () => {
    document.getElementById('isbn').value = '';
    document.getElementById('title').value = '';
    document.getElementById('publish').value = '';
    document.getElementById('price').value = '';
    document.getElementById('title').focus(); //입력 포커스 주기

}

const getAllBooks = async () => {
    try {
        const response = await fetch(url);
        // alert(response.status)
        const data = await response.json();

        //데이터 확인 후 id가 result인 곳에 데이터 출력하기
        renderBooks(data);

    } catch (error) {
        showError(error)
    }
}

const renderBooks = (data) => {
    const result = document.querySelector('#result');
    result.innerHTML = ``

    for (const book of data) {
        const str = `<tr>
                    <td>${book.title}</td>
                    <td>${book.publish}</td>
                    <td>${book.price}</td>
                    <td>${book.isbn}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="getBook('${book.isbn}')">수정</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteBook('${book.isbn}')">삭제</button>

                    </td>
                </tr>`;
        result.innerHTML += str;
    }
}

const getBook = async (isbn) => {
    console.log('getBook() isbn: ', isbn);
    try {
        //get방식으로
        const url2 = url + `/${isbn}`;
        const response = await fetch(url2)
        const data = await response.json();
        console.log(data);
        setFormData(data); //조회한 도서정보 form에 출력하기
    } catch (error) {
        alert(error);
    }
}

const setFormData = (book) => {
    if (!book) {
        alert('해당 도서가 없음');
        return;
    }
    document.getElementById('isbn').value = book.isbn;
    document.getElementById('title').value = book.title;
    document.getElementById('publish').value = book.publish;
    document.getElementById('price').value = book.price;
    //도서 이미지 
    let str = ``;
    if (book.image) { //이미지가 있을 때
        str += `<img src="http://localhost:7777/images/${book.image}" alt="${book.title}" class="img-thumbnail">`;//서버의 url을 보여줌
    } else {//없을 경우
        str += `<img src = "images/noimage.jpg" alt="Noimage" class="img-thumbnail">`; //프론드엔드 서버꺼를 보여줌
    }
    //id="bookImage"인 곳에 넣자
    document.getElementById('bookImage').innerHTML = str;

    //수정 버튼 활성화
    const btnUpdate = document.querySelector('#btnUpdate'); //초기에는 비활성화
    btnUpdate.removeAttribute("disabled"); //수정버튼 활성화
}

const deleteBook = async (isbn) => {
    //alert(isbn);
    const yn = confirm(`${isbn}번 도서를 삭제하시겠습니까?`)
    if (!yn) return;
    //DELETE '/books/1111'
    //fetch()이용해서 요청보내고 삭제된 도서데이터 잘 오는지 확인하기
    const deleteUrl = url + '/' + isbn;
    console.log(deleteUrl);
    try {
        const response = await fetch(deleteUrl, {
            method: 'delete'
        })
        const data = await response.json();
        alert(JSON.stringify(data));
        getAllBooks(); //모든 도서 가져오기
    } catch (error) {
        showError(error);
        console.log(error);
    }

}

//PUT으로 업데이트 하기
const updateBook = async (newBook) => { 
    //fetch로 도서 정보 업데이트하고 그에 따른 응답 처리.
    const url2 = url + `/${newBook.isbn}`; //newBook.isbn을 사용해 특정 도서의 정보를 업데이트할 url을 생성
    try {
        //fetch()
        const response = await fetch(url2, { //응답이 안왔는데 밑에서 제이슨을 불러서 response.json()이 펑션이 아니라고 오류가 떴다
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        //응답이 잘 오면 모든 도서 정보 가져오기
        const data = await response.json();
        console.log(data);
        if (data.message === 'success') {
            getAllBooks();
            clearInput(); //호출해서 초기화
            document.getElementById('btnUpdate').setAttribute("disabled", "disabled")
            //수정버튼 활성화
            document.getElementById('resultMessage').style.display = 'none';
        }else{
            document.getElementById('resultMessage').innerHTML = `<h3>${data.message}</h3>`
            document.getElementById('resultMessage').style.display = 'block';
        }
    } catch (error) {
        showError(error);
    }
}

export {getAllBooks, addBook, getBook, findBook, deleteBook, updateBook, addBookFileUp};
//파일 업로드 하기전에는 addBook을 썼고 업로드 후에는 addBookFileup을 쓴다