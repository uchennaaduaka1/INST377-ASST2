const api = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restArr = [];

fetch(api)
    .then(blob => blob.json())
    .then(data => restArr.push(...data));

function filterRes(wordToMatch, restArr) {
    return restArr.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.category.match(regex) || place.zip.match(regex)
    });
}
const searchInput = document.querySelector('.UserInput');
const suggestions = document.querySelector('.suggestions')

function matches() {
    const matchArr = filterRes(this.value, restArr);
    const inputData = matchArr.map(place => {
        if (this.value != '') {
            return `
            <li class="filteredDisplay">
                <ul>
                    <li>
                        <span class="name">${place.name}</span>
                    </li>
                    <li>
                        <span class="category">${place.category}</span>
                    </li>
                    <li>
                        <address class="address">${place.address_line_1}</address>
                    </li>
                    <li>
                        <span class="city">${place.city}</span>
                    </li>
                    <li>
                        <span class="zip">${place.zip}</span>
                        <br>
                    </li>
                </ul>
            </li>
            `;
        }
    }).join('');
    
    searchInput.innerHTML = inputData;
    suggestions.innerHTML = inputData;
}

searchInput.addEventListener('keyup', matches);