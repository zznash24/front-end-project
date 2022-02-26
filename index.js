
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
renderDogFacts()

//Called function for generating the card for adoptable dogs
console.log('im here');

function renderDog(animalsArray) {
  console.log('data fetch', animalsArray)
  const dConInner = document.createElement("div")
  let dogHTML = animalsArray.map(currentDog => {

    if (currentDog.primary_photo_cropped === null || currentDog.primary_photo_cropped.small === '') {
      let dogCard = `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_vJblJLSn59TSwKbG3-CawQ39uUHDX3vf0nX8q48Mr8anv5aBai_OGk2HrtqlVh1sy0&usqp=CAU" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="#" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
      dogsCon.innerHTML += dogCard
    } else {
      let dogCard = `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="${currentDog.primary_photo_cropped.small}" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
      dogsCon.innerHTML += dogCard;
    }
  }).join('');
}

//THis is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6ImYzNDFiODYyNDdhOWFhZDU5MDhjODYwZDRhZDQ0YmJmZDk3MjI0NTA3YTk0ZTI1YzZmZTllZDQ1ODNiZDJiZGMyYmYzYTRmMzkyOGVlZGYxIiwiaWF0IjoxNjQ1NzU1MjEyLCJuYmYiOjE2NDU3NTUyMTIsImV4cCI6MTY0NTc1ODgxMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.UymagCaUFnGtwBfDSMnQWHwhoVtKTXn8172Nu4cbSUeJajCtvOiTvoluBkIuXJMUYglQf8fI_B6gzrdH8CijnSilkC17d8x-V8hk6kL_lzMDhpD2_3WObKELIfBAdWPnkSTcgtrLuosdRGgCL-bJUoSkaSOvqnIczatYrEuW4ZHtIrvox2vZmuwGmPm7e80b7FAtlTBWNzL6C6nbVWjR1EQzI5vLIGMWAX_ClRUkubtZSBUgpopVUrFfibLx4DUjfN1Mr2LEdUMhO_8W3YKBvcbpqnR5z9iAPISk-g1Nh2LMwXeA9wp3UHfWRlaEY5wW84R3Rd8dzmsaRC3lSG2K1w");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('search btn click');
  let search_string = search_bar.value;
  console.log('after search', search_string)

  // fetch(`https://api.petfinder.com/v2/animals?type=dog&location=${search_string}`, requestOptions)
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