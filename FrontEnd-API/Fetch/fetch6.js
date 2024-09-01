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

    //여기서 async, await 대신 fetch랑 .then을 쓸 수 있다.
    try {
        const response = await fetch(url)
        const data = await response.json()
        // alert(data)
        if (!data.data) {
            alert(`${id}번 회원은 없습니다`)
            return;
        }
        const { id: userId, first_name, last_name } = data.data
        frm.name.value = first_name + " " + last_name;
        divFrm.style.display = 'block'
    } catch (err) {
        alert('error: ' + err)
    }
}

//수정 처리하는 메서드
const updateUser = async () => {
    event.preventDefault();
    try {
        //수정할 회원의 id값 받기
        const idVal = document.querySelector('#id'.value);

        //수정한 정보 name, job 받기
        const data = {
            id: idVal,
            name: frm.name.value,
            job: frm.job.value
        }

        //유효성 체크 (옵션)
        if (!data.job) {
            alert('직업란에 수정할 값을 입력하세요');
            frm.job.focus();
            return;
        }

        //put 메서드로 요청보내기
        updatePut(data);

        //응답 데이터를 받아서
        //id가 result인 곳에 출력하기(name, job, updateAt)

    } catch (error) {
        alert('Error: ' + error);
    }
}

const updatePut = async (data) => {
    try {
        let url = `https://reqres.in/api/users/${data.id}`;
        console.log(url);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        const { name, job, updatedAt } = responseData;
        const result = document.getElementById('result')
        result.innerHTML = `
            <h2>수정된 회원정보</h2>
            <h3>Id: ${data.id} </h3>
            <h3>name: ${name}</h3>
            <h3>job: ${job}</h3>
            <h3>updatedAt: ${updatedAt}</h3>
        `

        //이는 수정 버튼 누르고 폼의 텍스트가 초기화된다
        frm.name.value = ''; //입력 폼의 input 값 비우기
        frm.job.value = ''; 
        document.querySelector('#id').value = '';
        //밑에서 감추기 하는데 왜 위 코드를 작성하는가?
        /* 뭐 어디에서 다 보인다고 하더라. 그리고
           사용자 정보 입력하고 정보 초기화해주는게 맞다고 한다.
        */ 

        const divFrm = document.getElementById('divFrm')
        divFrm.style.display = 'none';//감추기

    } catch (error) {
        alert('error: ' + error)
    }
}