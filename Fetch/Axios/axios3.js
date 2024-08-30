function fectXML (){
    const url = 'note.xml'
    axios.get(url, {
        responseType: 'text'
    })
    .then(response => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data, '')

        const result = document.querySelector('#result')

        for(const note of notes){
            const to = note.getElementByTagName('to')[0].textContent;
            const from = note.getElementByTagName('from')[0].textContent;
            const heading = note.getElementByTagName('heading')[0].textContent;
            const body = note.getElementByTagName('body')[0].textContent;

            result.innerHTML += `
                <div>
                    h3>
            `
        }
    })
    .catch(error => alert('error: ' + error))
}