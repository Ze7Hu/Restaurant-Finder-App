var searchInput = document.getElementById("search-input");
var btnSearch = document.getElementById("btn-search");
var restaurant = document.getElementById("restaurant");
var btnRefresh = document.getElementById("btn-refresh");
var checkbox = document.getElementById("checkbox");
var rating = document.getElementById("rating");
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "53b514667bmsh143295e0a8819afp138c99jsn88f905128703",
//     "X-RapidAPI-Host": "wyre-data.p.rapidapi.com",
//   },
// };

////////////////////////////////////////////////////////////////
//
var newRestaurant = [];
// getting data from localStorage//
function getLocalStorage() {
  var storageData = JSON.parse(window.localStorage.getItem("data")) || [];
  displayList(storageData);
}
/// using while loop to get 6 of 28 restaurants
var arr = [];
while (arr.length < 6) {
  var r = Math.floor(Math.random() * 28) + 1;
  if (arr.indexOf(r) === -1) arr.push(r);
}

function getRestaurant() {
  //The API key doesn't work any more. So I used to save in JSON file to used it.
  fetch(`../data.json`)
    .then(response => response.json())
    .then(function (data) {
      console.log(data);

      for (var i = 0; i <= arr.length - 1; i++) {
        console.log("i", arr);
        newRestaurant.push({
          BusinessName: data[arr[i]]["BusinessName"],
          Address: data[arr[i]]["AddressLine2"],
          Area: data[arr[i]]["AddressLine3"],
          Postcode: data[arr[i]]["PostCode"],
          Stars: data[arr[i]]["RatingValue"],
        });
      }

      // saving data to the localStorage
      window.localStorage.setItem("data", JSON.stringify(newRestaurant));
      displayList(newRestaurant);
    })
    .catch(err => console.error(err));
}
btnSearch.addEventListener("click", function () {
  getRestaurant();

  console.log("clicked");
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
}
getLocalStorage();
