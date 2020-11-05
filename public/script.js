function range(int) {
    const arr = [];
    for (let i = 0; i < int; i += 1) {
        arr.push(i);
    }
    return arr;
}

function getRandomIntInclusive(min, max) {
    const min1 = Math.ceil(min);
    const max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1 + 1) + min1);
}

function changeDataShape(array) {
    return array.reduce((list, item, i) => {
        const findCat = list.find((findItem) => findItem.label === item.category);
            list.push({
                name: item.name,
                address: item.address_line_1,
                label: item.category,
                zip: item.zip
            });
        return list;
    }, []);
}

function manipulateAndBind(incomingArray) {
    const arrayOfTenItems = range(10);
    const randomRestaurantArray = arrayOfTenItems.map((item) => {
        const which = getRandomIntInclusive(0, incomingArray.length);
        const restaurant = incomingArray[which];
        return restaurant;
    });

    sessionStorage.setItem('shortRestaurantList', JSON.stringify(randomRestaurantArray));

    const div = document.createElement('div');
    div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantArray[0])}<br/><br/>`;
    $('.flex-outer').append(div);

    const newDataShape = changeDataShape(randomRestaurantArray);

    const div2 = document.createElement('div');
    const obj = {
        name: randomRestaurantArray[0].name,
        address: randomRestaurantArray[0].address_line_1,
        label: randomRestaurantArray[0].category,
        zip: randomRestaurantArray[0].zip
    };
    div2.innerHTML = `<h2>What we want</h2> <br/> <h4>A category, how many things are in the category</h4><pre><code class="language-javascript">${JSON.stringify(obj)}<br/><br/>`;

    $('.flex-outer').append(div2);
}

async function loadData() {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    return json;
}

async function mainThread() {
    console.log('Firing main thread');
    const manip = await loadData();
    console.log('Check session storage', sessionStorage);
    const restaurantData = JSON.parse(sessionStorage.getItem('shortRestaurantList'));
    manipulateAndBind(manip);
    console.table(restaurantData);
}

window.onload = mainThread;