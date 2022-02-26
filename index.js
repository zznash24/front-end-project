//This is the API for the random dog facts that will be appearing towards the top of the page.

let factNumber = 1;

function renderDogFacts() {
  let dogFactHTML = document.getElementById('dogFacts')
  axios.get(`https://cors-anywhere.herokuapp.com/https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=${factNumber}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => {
    dogFactHTML.innerHTML = response.data[0].fact;
  })
}
renderDogFacts();

//Called function for generating the card for adoptable dogs
function renderDog(animalsArray) {

  console.log('data fetch', animalsArray)
  const dConInner = document.createElement("div")
  let dogHTML = animalsArray.map(currentDog => {
    // map goes through each element, return creates a new array of each element that is returned
    if (currentDog.primary_photo_cropped === null || currentDog.primary_photo_cropped.small === '') {
      return `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card text-white bg-dark">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_vJblJLSn59TSwKbG3-CawQ39uUHDX3vf0nX8q48Mr8anv5aBai_OGk2HrtqlVh1sy0&usqp=CAU" class="card-img-top" alt="...">
            <div class="card-body row">
              <div class="col-6">
                  <h5 class="card-title">${currentDog.breeds.primary}</h5>
                  <p class="card-text">${currentDog.age}</p>
              </div>
              <div class="col-6">
                Spade
              </div>
              <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
            </div>
          </div>
        </div>`
    } else {
      return `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card text-white bg-dark">
            <img src="${currentDog.primary_photo_cropped.small}" class="card-img-top" alt="...">
            <div class="card-body row">
              <div class="col-6">
                <h5 class="card-title">${currentDog.breeds.primary}</h5>
                <p class="card-text">${currentDog.age}</p>
              </div>
              <div class="col-6">
                Spade
              </div>
                <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
            </div>
          </div>
        </div>`
    }
  }).join('');
  dogsCon.innerHTML = dogHTML;
}

//THis is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

var myHeaders = new Headers();

myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6IjViMWY1Zjg1NTBkYjc5NTljZGEyZGZjYjIzNTcxZDBkZDkwOWQ2ZDk0MzVkZGU4NjFmMGVmZTgyOWQzYWU5NmIxN2JkMjc2NGE0ZWI5ZDUwIiwiaWF0IjoxNjQ1OTAwODgzLCJuYmYiOjE2NDU5MDA4ODMsImV4cCI6MTY0NTkwNDQ4Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.G74zQOThzFX8yU69vOYFkRSeENuDOzhGnxuw0Yn1gyXNtWlh5vf49KGuBq0TSzvw36tFv0QV7tiiIJS5h7Lxv8tYCFujecrLN8dLbrCEdOyNBvrGePJymnidejTHFH9M66svx20vQowOxtscY3BtmQLYzmnAWGK7HVnc9hkIZhtuehTJTxnxYe2QThBSg0JatClIWf9qM8Jm7tQzAlo5Kg3NYmXicUUAwG9ZHNTp9QuMk0ZjKZIHVguNNeMabFHuYgDEIFzZfn7mx58-9aZ8LdDgVNq0dyahDlEZWSwD9XZuLg3HkesTnqVfyLfgxkA0KUxKPXB_B_akKFlXu0da3Q");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

window.addEventListener('load', e => {
  e.preventDefault();
  fetch(`https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&sort=-recent`, requestOptions)
    .then(response => response.json())
    .then(function (data) {
      renderDog(data.animals)
    });
});

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let search_string = search_bar.value;

  console.log('after search', search_string)

  fetch(`https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?type=dog&location=${search_string}`, requestOptions)
    .then(response => response.json())
    .then(function (data) {
      console.log('data', data)

      renderDog(data.animals)
    });
});


function nextFact() {
  factNumber++;
  renderDogFacts();
}

function previousFact() {
  if (factNumber == 0) {
    return;
  }
  factNumber--;
  renderDogFacts();
}

