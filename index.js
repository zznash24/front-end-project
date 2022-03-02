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

function isTheAnimalFixed(currentDog) {
  if (currentDog.attributes.spayed_neutered == false) {
    return '&#10060';
  }else {
    return '&#9989';
  }
};

function isTheAnimalVacced(currentDog) {
  if (currentDog.shots_current == false){
    return '&#10060'
  }else {
    return '&#9989';
  }
};

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

//THis is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

var myHeaders = new Headers();

myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6ImUzMTMzZWQ3OTVlZTNkNDg4ODhlZDViNjQ2ZTljMGNiYzY1ZDQxNGZkM2RhNzQyZjAxMThkYWY0ODRmZmVmOTNkMWFhYTg2MDk5NGFlY2QxIiwiaWF0IjoxNjQ2MTg1NTc5LCJuYmYiOjE2NDYxODU1NzksImV4cCI6MTY0NjE4OTE3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.SDnnUVysxHspLqQxM7AfX0-hCeeczDPf19q67p484OPqgw8_gwNv4DYmpys1YS8m8DTwmQmKNPvXW0Ev6ukfZ6Wjo4C7irvwKTaYdl4zMhGggW828GP_xZOwS99w9NWnd2cpOQgpmb1Ar67KoVegWJhH3uY7pxyZb5RJRti6VEm55MNvc6_zrcC10Yv2AfFBsenqQ47eClfvPr_qEM-b5K6eSndKDXTYd41nsbQy4qQYgzt--oIS6nnx2WzNDiNA6xeylNzC0OVpjSZFUq2LuhpKIDzv3EB9XzsxhyDb3-r7vl95MYCcaOL2acBVP3PP2r35xGs_RHqR7TZZ4fNnXw");

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

