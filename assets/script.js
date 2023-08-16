var searchInput = document.getElementById("search-input");
var btnSearch = document.getElementById("btn-search");
var restaurant = document.getElementById("restaurant");
var btnRefresh = document.getElementById("btn-refresh");
var checkbox = document.getElementById("checkbox");
var rating = document.getElementById("rating");
var modal = document.getElementById("modal");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8dba26f2c3msh08d11e4b72d3f70p152855jsn19013fbdf1bb",
    "X-RapidAPI-Host": "wyre-data.p.rapidapi.com",
  },
};

////////////////////////////////////////////////////////////////
//
var newRestaurant = [];
// getting data from localStorage//
function getLocalStorage() {
  var storageData = JSON.parse(window.localStorage.getItem("data")) || [];

  if (storageData.length == 0) return;
  var arr = [];

  while (arr.length < 6) {
    var r = Math.floor(Math.random() * storageData.length) + 1;

    if (arr.indexOf(r) === -1) arr.push(storageData[r]);
  }

  displayList(arr);
}

function getRestaurant() {
  // fetching dta from wyre data
  fetch(
    `https://wyre-data.p.rapidapi.com/restaurants/town/${searchInput.value}`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0)
        return showCustomMessage("please type valid city name");

      // console.log(data);
      for (var i = 0; i <= 30; i++) {
        newRestaurant.push({
          BusinessName: data[i]["BusinessName"],
          Address: data[i]["AddressLine2"],
          Area: data[i]["AddressLine3"],
          Postcode: data[i]["PostCode"],
          Stars: data[i]["RatingValue"],
        });
      }

      // saving data to the localStorage
      window.localStorage.setItem("data", JSON.stringify(newRestaurant));

      // gets first 6 restaurant from the list
      let lastSixRestaurants = Array.from(
        { length: newRestaurant.length - 25 },
        (v, index) => newRestaurant[index]
      );

      displayList(lastSixRestaurants);
    })
    .catch(err => console.error(err));
}
// displaying modal when user type wrong city or empty input
function showCustomMessage(message) {
  Toastify({
    text: message,
    duration: 8000, // 8 seconds
    destination: "#",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #e34b30, #ec6661)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

btnSearch.addEventListener("click", function () {
  getRestaurant();
});
btnRefresh.addEventListener("click", function () {
  window.location.reload();
  getRestaurant();
});

// displaying data
function displayList(list) {
  restaurant.innerHTML = "";

  list.forEach(rs => {
    restaurant.innerHTML += `
    <div id="restaurant" class=" restaurant leading-8 text-2xl w-72 bg-gray-100 rounded-sm p-4  ">
    <h3 font-bold>Name: ${rs.BusinessName}</h3>
            <p>Addresses: ${rs.Address}.</p>
            <p>Area: ${rs.Area}.</p>
            <p>Postcode: ${rs.Postcode}.</p>
            <p >Stars:${"⭐".repeat(rs.Stars)} </p>`;
  });
  searchInput.value = "";
}
getLocalStorage();
