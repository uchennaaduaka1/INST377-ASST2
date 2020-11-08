const restaurants = [];

fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => restaurants.push(...jsonFromServer))
    .catch((err) => {
      console.log(err);
    });


function findMatches(wordMatch, restaurants) {
    if(wordMatch != ''){
        result = restaurants.filter(curr => {
            const regex = new RegExp(wordMatch, 'gi');

            console.log(curr.name);
            return curr.name.match(regex) 
                || curr.category.match(regex) 
                || curr.address_line_1.match(regex)
                || curr.city && curr.city.match(regex)
                || curr.zip.match(regex);
        });
        return result;
    }
    else {
        return [];
    }
}

const query = document.querySelector('#search');

function showMatches() {
    $('#filteredCases').empty();
    $('#filteredCases').append(`<ul class="suggestions"></ul>`);


    const matchList = findMatches(this.value, restaurants);
    const html = matchList.map(restaurant => {
        return `
        <li>
            <span class="name">${restaurant.name}</span><br>
            <span class="category">${restaurant.category}</span><br>
            <address class="address">
                ${restaurant.address_line_1}<br>
                ${restaurant.city}<br>
                ${restaurant.zip}
            </address>
        </li><br>
        `;
    }).join('');
    $('.suggestions').append(html);
    
}

query.addEventListener('input', showMatches);