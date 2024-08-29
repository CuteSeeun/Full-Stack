function createUser(){
    //서버에 submit하지 못하게 막자
    event.preventDefault()

    // 두 개 다 같은 내용의 코드임
    /*사용자가 입력한 값 받아보기. name,job*/
       //let name = document.getElementById('name').value;
    /*form네임.input네임.value*/
    const data = {
        name: frm.name.value, //접근할 수 있는 이유 : 
        job: frm.job.value
    }
    console.log('data: ', data);

    //유효성 체크
    if(!data.name){
        alert('이름을 입력하세요');
        frm.name.focus(); //입력 포커스 추가
        return; //리턴 꼭 써줘야 함. 왜?
    }
    if(!data.job){
        alert('직업을 입력하세요');
        frm.job.focus();
        return;
    }

    registerUser(data);
}

//async, await : 올때까지 기다린다
async function registerUser(data) {
    const url = `https://reqres.in/api/users`;
    try{
        const response = await fetch(url, {
            method : 'POST',//메서드라는 속성
            headers: { //파라미터에 그냥 데이터가 아니라 제이슨으로 보내고 싶을 때 일케 써야함
                'Content-Type' : 'application/json' //post방식으로 보내는 것은 제이슨 유형이다라는걸 알려주는 코드
            },//제이슨으로 보낼 때 헤더에 기술해야 한다 이는 값이 객체로 들어간다

            //전송할 데이터는 바디. 이는 제이슨이다
            body : JSON.stringify(data)
            //즉 psot 방식으로 전송할 데이터를 josn객체가 아니라 json형태의 문자열로 만들어 보낸다

        }) //get방식은 디폴트여서 옵션을 안넣어도 되는데 post방식은 옵션을 넣어야 한다 객체라서 중괄호로 감싸줘야 한다
                       //post 방식일 때는 옵션을 기술하자
        const responseData = await response.json()
        console.log(responseData);
        const {name, job, id, createAt} = responseData; //비구조 할당_객체의 속성을 쉽게 추출해 개별 변수에 할당 가능
        const result = document.querySelector('#result');
        result.innerHTML = `
            <h2>등록된 회원 정보</h2>
            <h3>ID: ${id}</h3>
            <h3>Name: ${name}</h3>
            <h3>Job: ${job}</h3>
            <h3>createAt: ${createAt}</h3>
        `

    }catch(error){
        console.error(error);
        alert(error);
    }
}