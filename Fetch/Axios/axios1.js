const bt1 = document.querySelector('#btn1')

btn1.addEventListener('click', () => {
    const url = 'news.json';
    axios.get(url)
        .then(response => { 
            // alert(JSON.stringify(response)); 이건 fetch할 때 필요
            //우리가 원하는 데이터는
            const newsItem =response.data.item
            console.log(newsItem);
            const result = document.querySelector('#newsContainer')
            result.innerHTML= `
                <a href="${newsItem.link}" target="_blank"> <h2>${newsItem.title}</h2></a>
                <h3>${newsItem.author}</h3>
                <h3>${newsItem.link}</h3>
            `
            
        })
        .catch(error => alert(error));
})