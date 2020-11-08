const searches = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const res = [];

fetch(searches).then(blob => blob.json()).then(data => res.push(...data));

function findMatches(matchedWord, res) {
    return res.filter(establishments => {
        const regexFound = new RegExp(matchedWord, 'gi');
        return establishments.name.match(regexFound) || establishments.category.match(regexFound)
    });
}

function displayMatches() {
    const matchedArr = findMatches(this.value, res);
    const html = matchedArr.map(establishments => {
        return `
         <li>
            <span class="name">${establishments.name}</span><br>
            <span class="category">${establishments.category}</span><br>
            <span class="address"><address>${establishments.address_line_1}, 
            ${establishments.address_line_2}, 
            ${establishments.city}, 
            ${establishments.state}, 
            ${establishments.zip}
            </address></span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML=html;
    
    const replacedRegex = new RegExp("------,",'gi');
    delEmptyAddress = html.replace(replacedRegex," ");
    suggestions.innerHTML=delEmptyAddress;  
}

const userInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

userInput.addEventListener('change', displayMatches);
userInput.addEventListener('keyup', displayMatches);