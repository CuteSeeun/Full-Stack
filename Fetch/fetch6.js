//정보 조회 버튼 클릭 메서드
const find = () => {
    //얘는 폼으로 감싸지 않앗기에 서브밋 버튼이여도 전송 기능이 없다. 
    const idVal = document.querySelector('#id').value;
    const divFrm = document.querySelector('divFrm'); // div => display: none

    if (!idVal) {

        alert('id를 입력하세요');
        document.querySelector('#id').focus();
        return;
    }
    //isNaN(값) : 값이 숫자가 아니면 true
    if (isNaN(idVal)) {
        alert("이디어는 정수로 입력해야 한다.");
        document.querySelector('#id').select();
        return;
    }
    //get으로 사용자 정보 조회해서 받은 데이터를 #divFrm->form->input의 value로 넣어주자
    getUserInfo(idVal);
}

const getUserInfo = async (id) => {
    let url = `https://reqres.in/api/users/${id}`;

    try {
        const response = await fetch(url)
        const data = await response.json()
        // alert(data)
        if(!data.data){
            alert(`${id}번 회원은 없습니다`)
            return;
        }
        const {id:userId, first_name, last_name} = data.data
        frm.name.value = first_name + " " + last_name;
        divFrm.style.display = 'block'
    } catch (err) {
        alert('error: ' + err)
    }
}

//수정 처리하는 메서드
const updateUser = async ()=>{
    try{
        //수정할 회원의 id값 받기
        const idVal = document.querySelector('#id'.value);

        //수정한 정보 name, job 받기
        const data = {
            id: idVal,
            name: frm.name.value,
            job: frm.job.value
        }

        //유효성 체크 (옵션)
        if(!data.job){
            alert('직업란에 수정할 값을 입력하세요');
            frm.job.focus(); 
            return;
        }

        //put 메서드로 요청보내기
        updatePut(data);

        //응답 데이터를 받아서
        //id가 result인 곳에 출력하기(name, job, updateAt)

    } catch(error){
        alert('Error: ' + error);
    }
}

async function updatePut(data) {
    const url = `https://reqres.in/api/users/${data.id}`;
    try{
        const response = await fetch(url, {
            method : 'PUT',
            headers: { 
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        }) 
        //응답 데이터 받기
        const responseData = await response.json()
        const {name, job, id, updateAt} = responseData;
        const result = document.querySelector('#result');
        result.innerHTML = `
            <h2>수정된 회원 정보</h2>
            <h3>ID: ${id}</h3>
            <h3>Name: ${name}</h3>
            <h3>Job: ${job}</h3>
            <h3>createAt: ${updateAt}</h3>
        `
        const divFrm = document.getElementById('divFrm')
        divFrm.style.display = 'none';
        
    }catch(error){
        alert(error);
    }
}