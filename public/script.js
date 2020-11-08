const searches = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restResults = [];

fetch(searches).then(blob => blob.json()).then(data => restResults.push(...data));
 
function getMatches(matchedWords,restResults) {
    return restResults.filter(establishments => {
        const regexMatches = new RegExp(matchedWords,'gi');
        return establishments.name.match(regexMatches) || establishments.category.match(regexMatches)
    });
}

function showMatches() {
    const matchArr = getMatches(this.value, restResults);
    const html = matchArr.map(establishments => {
        return `
         <li>
            <span class="name">${establishments.name}</span><br>
            <span class="category">${establishments.category}</span><br>
            <span class="address"><address>${establishments.address_line_1}, ${establishments.address_line_2}, ${establishments.city}, ${establishments.state}, ${establishments.zip}
            </address></span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML=html;
    
    const replacedRegex = new RegExp("------,",'gi');
    deleteEmptyAddresses = html.replace(replacedRegex," ");
    suggestions.innerHTML=deleteEmptyAddresses;  
}

const userInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

userInput.addEventListener('change',showMatches);
userInput.addEventListener('keyup', showMatches);