const bt1 = document.querySelector('#btn1')
const result = document.querySelector('#result');
// const url = 'https://reqres.in'


bt1.onclick = () => {
    //페이지 번호 동적으로 받아보기 (페이지를 동적으로 넣을거임)
    const pageNo = prompt('조회할 페이지 번호를 입력하세요')
    if(!pageNo) return;
    let url = `https://reqres.in/api/users?page=${pageNo}`;
    getAllUser(url);
}

const getAllUser= (url)=>{
    fetch(url)
    .then((response)=>{
        //false로 왔을 때
        if(!response.ok) throw new Error('데이터 없거나 네트웍 문제');
        return response.json()
    })
    .then((data)=>{
        //받아온 데이터를 alert로 찍어보자
        //alert(JSON.stringify(data)) _ 확인함

        //객체로 넘어오는 데 그 중에서 data만 받아와보자
        const {data:userlist} = data;
        // console.log(userlist);
        if(userlist.length == 0){
            result.innerHTML = `<h2 style = "color:red"> 요청한 페이지는 없다 </h2>`
        }else{
            renderUI(data)
        }

    })
    .catch((error)=>{
        alert(error)
    })
}

const renderUI = (data)=>{
    const {page, per_page, total, total_pages, data:userlist} = data;
    //테이블로 해보자
    let str = `<table class = "table">
        <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
        <tr>
    `

    //반복문
    for(let i=0; i<userlist.length; i++){
        let user = userlist[i] //객체 : user
        str += `
            <tr>
                <td>${user.id}</td>
                <td><img src="${user.avatar}" alt="이미지"></td>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
            </tr>
        `
    }

    str += `</table>`
    result.innerHTML=str;


}