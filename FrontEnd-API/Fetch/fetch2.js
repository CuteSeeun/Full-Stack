const bt1 = document.querySelector('#btn1');
const result = document.querySelector('#result');
const url = 'https://reqres.in'

bt1.onclick = () => {
    // alert('안녕');
    // getUserInfo(url);
    const findID = prompt("검색할 회원의 id 번호를 입력하세요");
    if(!findID){
        return;
    }
    const newUrl = url + `/api/users/${findID}`;
    console.log(newUrl);
    getUserInfo(newUrl);
}

//동적으로 회원정보 입력하면 받아오기?
const getUserInfo = (newUrl) => {
    //fetch메서드 이용해서 데이터 받아서 #result에 출력하기
    fetch(newUrl)
        .then((response) => {
            if (!response.ok) //데이터가 없으면 false로 온다
                throw new Error('요청이 잘못됐거나 네트웍에 문제 발생')
            return response.json() //JSON.parse(xhr.responseText)
        })
        .then((data) => {
            renderUI(data);
        })
        .catch((error) => {
            alert('Error: ' + error)
        })

}

const renderUI = (data) => {
    const { id, first_name, last_name, email, avatar } = data.data;
    // console.log(id, first_name, last_name, email, avatar);
    result.innerHTML = `
    <h2>회원 정보</h2>
    <img src = "${avatar}">
    <h3>ID: ${id}</h3>
    <h3>Name: ${first_name} ${last_name}</h3>
    <h3>Email: ${email}</h3>
    `
}