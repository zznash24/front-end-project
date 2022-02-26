
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
console.log('im here');

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
            <div class="card-body">
                <h5 class="card-title">${currentDog.breeds.primary}</h5>
                <p class="card-text">${currentDog.age}</p>
                <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
            </div>
          </div>
        </div>`
    } else {
      return `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card text-white bg-dark">
            <img src="${currentDog.primary_photo_cropped.small}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${currentDog.breeds.primary}</h5>
                <p class="card-text">${currentDog.age}</p>
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
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6IjNiMGY2Mzc4MmE3Nzg5OGZlZTc1NmJjNTFlMDcyYjY5NGI3MGY0MWI2YTg5YjAxOWZlNDBhMDI0NGUyZmNhMDkwNjEyYmFlMWRmNDYyYTg4IiwiaWF0IjoxNjQ1ODk2ODIyLCJuYmYiOjE2NDU4OTY4MjIsImV4cCI6MTY0NTkwMDQyMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.Nv9DBFjWJWgNkIdOBf6ElmaSQMCBXkRGDOGuSZhYjfGppGSFIfiCuRfr0sQC2fGDzEyP1p7iToXr8kxgg1n1Kcmf9vjdITejbsPR0GBiGGnE55aHOp2TKBCFyLuOYWHB-Tq7EsLl1Y3FdorQwMWWzQLzsLUdIom8A_s9a_UemjiAPoLBafes3WTl5FSFEnRHopz_R977lrV3VZBozHNoKqCTXMXaDogMn1y7nBIpgS0LedpEKaz3x4m4lXMssX7zHV64hksdPnCesXOhSpbQ5U43PcDydMAbaAle9I9I-F3c7zKulcAUF5E3-QHDrk4lKb4zRgKFyljRVYrkW474GQ");

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
  console.log('search btn click');
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

