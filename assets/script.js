var searchInput = document.getElementById("search-input");
var btnSearch = document.getElementById("btn-search");
var restaurant = document.getElementById("restaurant");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": 'ca7062ca52msh72839442beb59d9p15247ajsnde42fd9c86c9',
    "X-RapidAPI-Host": "wyre-data.p.rapidapi.com",
  },
};

function getRestaurant() {
  fetch(
    `https://wyre-data.p.rapidapi.com/restaurants/town/${searchInput.value}`,
    options
  )
    .then(response => response.json())
    .then(function (data) {
      var arrData = Object.entries(data);
      // console.log(arrData);
      for (var i = 0; i < arrData.length; i++) {
        var randomRestaurants =
          arrData[Math.floor(Math.random() * arrData.length)];
        console.log(randomRestaurants[i]);
        restaurant.innerHTML = `
        <div id="restaurant" class="leading-8 text-2xl w-72">
        <h3 font-bold>Name: ${randomRestaurants[i].BusinessName}</h3>
                <p>Addresses: ${randomRestaurants[i].AddressLine2}.</p>
                <p>Area: ${randomRestaurants[i].AddressLine3}.</p>
                <p>Postcode: ${randomRestaurants[i].PostCode}.</p>
                <p>Stars: ${randomRestaurants[i].RatingValue}.</p>

    
        `;
      }
    })
    .catch(err => console.error(err));
}
btnSearch.addEventListener("click", function () {
  getRestaurant();
  console.log("clicked");
});



/*function logData() {
	console.log(getData());
}

function getData() {
	return {
		liked: localStorage.getItem('liked') ? localStorage.getItem('liked') : "",
		unliked: localStorage.getItem('unliked') ? localStorage.getItem('unliked') : ""
	};
}
getData();


function refreshPage(){
  window.location.reload();
} 
<button type="submit" onClick="refreshPage()">Refresh Button</button> */




/*const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ca7062ca52msh72839442beb59d9p15247ajsnde42fd9c86c9',
		'X-RapidAPI-Host': 'wyre-data.p.rapidapi.com'
	}
};

fetch('https://wyre-data.p.rapidapi.com/restaurants/town/hambleton', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err)); */