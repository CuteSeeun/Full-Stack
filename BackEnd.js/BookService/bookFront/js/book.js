const baseUrl = `http://localhost:7777`; 
const init = ()=>{
    const btnAll = document.querySelector('#btnAll');
    btnAll.onclick = async()=>{
        const url = baseUrl + '/books';
        try {
            const response = await fetch(url);
            // alert(response.status)
            const data = await response.json();

            //데이터 확인 후 id가 result인 곳에 데이터 출력하기
        } catch (error) {
            alert('Error: ' +error)
        }
    }
}

document.addEventListener('DOMContentLoaded', init)