
//This is the API for the random dog facts that will be appearing towards the top of the page.

function renderDogFacts(fact) {
  let dogFactHTML = document.getElementById('dogFacts')
  axios.get(`https://cors-anywhere.herokuapp.com/https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1`, {
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
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_vJblJLSn59TSwKbG3-CawQ39uUHDX3vf0nX8q48Mr8anv5aBai_OGk2HrtqlVh1sy0&usqp=CAU" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="#" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
        dogsCon.innerHTML += dogCard 
    } else {
      let dogCard =  `<div class="card text-white bg-dark" style="width: 18rem;">
                          <img src="${currentDog.primary_photo_cropped.small}" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="card-title">${currentDog.breeds.primary}</h5>
                              <p class="card-text">${currentDog.age}</p>
                              <a href="#" class="btn btn-primary">Adopt Me</a>
                          </div>
                        </div>`
        dogsCon.innerHTML += dogCard     
    }

    }).join('');

    // dogsCon.appendChild(dogHTML);
    // return dogHTML.join('');
}

//THis is the API for the Adoptable pets on the page
let dogsCon = document.getElementById('Dogs-Container');
let search = document.getElementById('search-form');
let search_bar = document.getElementById('search-text');
let searchBtn = document.getElementById('search_button');

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ2MGk4djVyZzFVZGZITnZwQ3FzVlhCUWRjUFlOOXdtZkk5ZVpPaURVejNOT1VaQkhGWSIsImp0aSI6ImM1Y2Q4ODM4YjI0M2VlMTc2YjA4ZjI4Y2Q3ZjNiOGMzYTA2ODgzZTZkZTBhYWY3Yzg1ZGRmMDExMzk4MmVkZDZiYmM0NmJhNTliYjFlMTUwIiwiaWF0IjoxNjQ1NTkwNzQ1LCJuYmYiOjE2NDU1OTA3NDUsImV4cCI6MTY0NTU5NDM0NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.rFhc5fjqtTVx-NtEn6ip22GzAOCxyBmfm1kb-L3UbWPUU-GMtNrmuTVh-kUSJd10FEm_MyuiDzLTx0n4_lnguRwO3tflYIUr4PzRncddKqeAIOQbDxrKbZL5LYZYmjszZuO6Ydri7WlDXD6EStEFUdkSg3bnw_lLEterwbB4eSANIUTb6dB77hMVAR9HUQLVvfnHXxdjlj4tTFmULF5-R8yHP6soiY64SSGiqwd2qk4bZ0efJ4twp8UnBCMS5TdtD2-BIzFvBEDwzKZHU1KhPctkUBXqBWrIeaBSoqcj2ZRJ301yXKh8ilK0gUylLXmdOhYTRIVvzOzuPdcHPCPnmA");

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

  // //This is the API for the random dog facts that will be appearing towards the top of the page.
  // var requestOptions = {
  //   method: 'GET',
  //   redirect: 'follow'
  // };
  
  // fetch("https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

 
 
