const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const restaurant = [];

fetch(endpoint).then(blob => blob.json()).then(data => restaurant.push(...data));

function findMatches(wordToMatch, restaurant) {
    return restaurant.filter(establishments => {
        const regex = new RegExp(wordToMatch, 'gi');
        return establishments.name.match(regex) || establishments.category.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurant);
    const html = matchArray.map(establishments => {
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
    
    const replaceRegex = new RegExp("------,",'gi');
    delEmptyAddress = html.replace(replaceRegex," ");
    suggestions.innerHTML=delEmptyAddress;  
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);