//This is the API for the random dog facts that will be appearing towards the top of the page.

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
let bearerToken = '';
var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_id", "v0i8v5rg1UdfHNvpCqsVXBQdcPYN9wmfI9eZOiDUz3NOUZBHFY");
urlencoded.append("client_secret", "clbO2ocTCF6brZhuxhgQrMJKZtS5eJXleqP9WSdv");

var requestOptionsBearer = {
  method: 'POST',
  body: urlencoded,
  redirect: 'follow'
};

var myHeaders = new Headers();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.petfinder.com/v2/oauth2/token", requestOptionsBearer)
  .then(response => response.json())
  .then(result => {
    bearerToken = result.access_token;
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);
    fetch(`https://api.petfinder.com/v2/animals?type=dog&sort=-recent`, requestOptions)
    .then(response => response.json())
    .then(function (data) {
      renderDog(data.animals)
    });
  })
  .catch(error => console.log('error', error));

let factNumber = 0;
let dogFact = [];

function renderDogFacts() {
  let dogFactHTML = document.getElementById('dogFacts');
  fetch(`https://www.dogfactsapi.ducnguyen.dev/api/v1/facts/?number=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      dogFactHTML.innerHTML = data.facts;
      dogFact.push(data.facts);
    })
    .catch(error => {
      console.error('Error fetching dog facts:', error);
    });
}

function isTheAnimalFixed(currentDog) {
  if (currentDog.attributes.spayed_neutered == false) {
    return '&#10060';
  } else {
    return '&#9989';
  }
};

function isTheAnimalVacced(currentDog) {
  if (currentDog.shots_current == false) {
    return '&#10060'
  } else {
    return '&#9989';
  }
};

//Called function for generating the card for adoptable dogs
function renderDog(animalsArray) {
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
                <p class="card-text">Gender: ${currentDog.gender}</p>
                <p class="card-text">Fixed: ${isTheAnimalFixed(currentDog)}</p>
                <p class="card-text">Vaccinated:${isTheAnimalVacced(currentDog)}</p>
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
                <p class="card-text">Gender: ${currentDog.gender}</p>
                <p class="card-text">Fixed: ${isTheAnimalFixed(currentDog)}</p>
                <p class="card-text">Vaccinated: ${isTheAnimalVacced(currentDog)}</p>
              </div>
                <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
            </div>
          </div>
        </div>`
    }
  }).join('');
  dogsCon.innerHTML = dogHTML;
}

//This is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let search_string = search_bar.value;

  fetch(`https://api.petfinder.com/v2/animals?type=dog&location=${search_string}`, requestOptions)
    .then(response => response.json())
    .then(function (data) {

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
  let dogFactHTML = document.getElementById('dogFacts');
  dogFactHTML.innerHTML = dogFact[factNumber];
}

