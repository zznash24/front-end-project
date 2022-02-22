//Called function for generating the card for adoptable dogs

function renderDog(animalsArray) {
    let dogHTML = animalsArray.map(currentDog => {
        return `<div class="card text-white bg-dark" style="width: 18rem;">
                        <img src="${currentDog.photo}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${currentDog.breeds.primary}</h5>
                            <p class="card-text">${currentDog.age}</p>
                            <a href="#" class="btn btn-primary">Learn More About</a>
                        </div>
                </div>`
    })
    return dogHTML.join('');
}

//THis is the API for the Adoptable pets on the page
let dcard = document.getElementById('dcard');

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6ImFkYjc4ODA3OWE1M2UyZjQyNDkxODUxMTA5YWQ5MTJmOWNiODA5ZDM2YmNiNzFmYzA1YzMzMjI2Njk4YjVhZTUyMzc5ZmY3ZTNhMzkxN2ExIiwiaWF0IjoxNjQ1NDg0Nzk4LCJuYmYiOjE2NDU0ODQ3OTgsImV4cCI6MTY0NTQ4ODM5OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Ke4pT0r_pus_WPpJQLvewteSa_JPokojrHaiMWhRYEzjv1XgON84bIVm5jFKVdJtcTb4HkfoaLEpqCcP4QK-BA2JCrJZM8-py9Wad2mx4RClP5OA_jqzxEStx4XRT2P6_jNbBGQ2ISSeFdymfz1pYQWu0tELFKox5Lp_aza6aY66Z7Bk669oWnblXh2-mNSRVUxcQT8IkJ0ulCNkfiZPfTyyESOGKscREt6744IIVfx52pG7OjAyVN9VAKHyrGvHkQ8ikcUA8r4-bdbu6J7JKQS-23IC0Y2N-0tjNw0YrinvmrJ3tWCbMTV-gWuOXgW9x0uT0yFxtrQ_m7HuZ9jhrQ");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.petfinder.com/v2/animals?type=dog&page=2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


  //This is the API for the random dog facts that will be appearing towards the top of the page.
let btn = document.getElementById('btn');
let ouput = document.getElementById('output');
let facts = requestOptions;
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    //When the button is clicked it call the dog facts api to generate a random dog fact
  btn.addEventListener('click', function() {

  });