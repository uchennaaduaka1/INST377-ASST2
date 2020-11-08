const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data))
  .catch((err) => {
    console.log(err);
  });
  
function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.category.match(regex)
  });
}

function displayMatches() {
  if (this.value == ''){
    suggestions.innerHTML = '';
  } else{
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const restaurantName = place.name.replace(regex, `<span class="hl">${this.value.toUpperCase()}</span>`);
    const restaurantCategory = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
    const restaurantAddress = place.address_line_1;
    const restaurantCity = place.city;
    const restaurantZip = place.zip;
    return `
      <li>
      <div class="listItem">
        <span class="name">${restaurantName}</span>
        <br>
        <span class='category'>${restaurantCategory}</span>
        <br>
        <span class="address">${restaurantAddress}</span>
        <br>
        <span class="city">${restaurantCity}</span>
        <br>
        <span class="zip">${restaurantZip}</span>
      </div>
      </li>
      <br>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);