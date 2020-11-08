fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(blob => blob.json())
    .then(data => food.push(...data));

const searchInput = document.querySelector(".textInput");
const suggestions = document.querySelector(".suggestions");
searchInput.addEventListener('keyup', displaymatches);

const food = [];

function findMatches(wordToMatch, food) {
  return food.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi"); 
    return place.name.match(regex) || place.category.match(regex);
  });
}

function displaymatches(){
    const matchArray = findMatches(this.value, food);
    const html = matchArray.map(place => {
        return `
        <li>
            <h4><span class="name">${place.name}</span></h4>
            <p>
            <span class="category">${place.category}</span>
            </p>
            <address><p>
                ${place.address_line_1}<br>
                ${place.city}, ${place.state} ${place.zip}<br>
            </p></address>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}