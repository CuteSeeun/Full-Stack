const id = document.querySelector('#id'); //HTMLinpurElement

const remove = ()=>{
    if(!id.value){
        alert('삭제할 회원의 id를 입력하세요');
        id.focus();
        return;
    }//if---------
    const url = `https://reqres.in/api/users/${id.value}`
    console.log(url);
    fetch(url, { //옵션을 중괄호로
        method: 'DELETE'
    })
    .then(response => {
        if(response.status == 204){ //응답 받음 (데이터는 없다 상태코드만 보내준다)
            const result = document.querySelector('#result')
            result.innerHTML = `<h2>회원 정보가 성공적으로 삭제됨</h2>`
        }else{
            throw new Error(`응답 코드 : ${response.status}`)
        }
    })
    .catch(error => alert(error))
    


} //remove()------