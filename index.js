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
function renderDog(animalsArray) {
  const dConInner = document.createElement("div")   
  let dogHTML = animalsArray.map(currentDog => {

    if (currentDog.primary_photo_cropped === null || currentDog.primary_photo_cropped.small ==='') 
    {
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_vJblJLSn59TSwKbG3-CawQ39uUHDX3vf0nX8q48Mr8anv5aBai_OGk2HrtqlVh1sy0&usqp=CAU" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="${currentDog.url}" target="_blank" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
        dogsCon.innerHTML += dogCard 
    } else {
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
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
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6IjRiNWU4OGZkODU4ZTgwZmRiOTdiZTNkZTE0NDQ5MGQ4YzRkZTdhMzJkMDE1NTE3NDEwNzljM2M0ZDk5ODdiNzFlYzM4ZTBiNWViMDkwYTE4IiwiaWF0IjoxNjQ1ODk0ODI5LCJuYmYiOjE2NDU4OTQ4MjksImV4cCI6MTY0NTg5ODQyOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.q-YFizNykd9CaTTK460X2QcTDpYoEOO-2dl9016rJRMqPGkxdoSrI8RCE77udiurEkr8DzFRUx8qUR5l5YlHc_z8FWFoeJuL7-slnxzkRphI2ARei-SFG2aDh3lvZ6NcDuR50sUYMhn7sw02dS-3WD4az32EogHu4HSFPciptnHKmOcVGrm8cQowvBM9la4U7eEWeAKm_JYuCFH5qcxP74xonOiCM6rkM3lwBUQ9ba8lB4IjS-Ewv0k6Qr3OfmZru4sJJOMQHEyXEkhothE4qEzkNrVw2UoJQsHUp3AzLaUbxBZoKE4jeYsA7hm3VgVT7qL3Ymxqi3kuk13gNelkZw");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let search_string = search_bar.value;
    
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
  if (factNumber==0) {
    return;
  }
  factNumber--;
  renderDogFacts();
}