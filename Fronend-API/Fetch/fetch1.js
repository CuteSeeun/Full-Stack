const bt1 = document.querySelector('#btn1');
const result = document.querySelector('#result');
const url = 'singleUser.json'

bt1.onclick = () => {
    // alert('안녕');
    getUserInfo(url);
}

const getUserInfo = (url) => {
    fetch(url)
        .then((response) => {
            //alert(response.ok) 이는 true로 나옴
            if (!response.ok)
                throw new Error('요청이 잘못됐거나 네트웍에 문제 발생')
            return response.json() //JSON.parse(xhr.responseText)
        })
        .then((data) => {
            // alert(JSON.stringify(data)) //data가 json객체로 온다

            //받아온 데이터를 화면에 출력
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