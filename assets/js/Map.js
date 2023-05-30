// import { infinityJSONData } from './infinityStones.js';

var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=78zYHolnZukJLq2No3tN')
    .addTo(map);



console.log("idooooooo");
console.log(infinityJSONData);
infinityJSONData.stones.forEach(element => {
    document.getElementById("places").innerHTML +=
        `<div class="row">
<div class="col d-flex justify-content-center align-items-center ">
    <h4>${element.name}</h4>
</div>
<div class="col d-flex justify-content-center align-items-center">
    <img class="stones" src="${element.image}" id="${element.keyword}" data-lat="${element.latitude}" data-lng="${element.longitude}" style="width: 60px; height: 40px;">
</div>
</div>`
});

// Create markers with custom icons for each Infinity Stone
infinityJSONData.stones.forEach(function (stone) {
    var customMarker = L.icon({
        iconUrl: stone.imageWithNoBg,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    L.marker([stone.latitude, stone.longitude], { icon: customMarker }).addTo(map);
});
var thanosImage = document.getElementById('thanos');
thanosImage.addEventListener('click', zoomToMarker);

var soulStoneImage = document.getElementById('soulStone');
console.log("soul" + soulStoneImage);
soulStoneImage.addEventListener('click', zoomToMarker);

var mindStoneImage = document.getElementById('mindStone');
console.log("mind" + mindStoneImage);
mindStoneImage.addEventListener('click', zoomToMarker);

var powerStoneImage = document.getElementById('powerStone');
console.log("power" + powerStoneImage);
powerStoneImage.addEventListener('click', zoomToMarker);

var spaceStoneImage = document.getElementById('spaceStone');
console.log("space" + spaceStoneImage);
spaceStoneImage.addEventListener('click', zoomToMarker);

var realityStoneImage = document.getElementById('realityStone');
console.log("real" + realityStoneImage);
realityStoneImage.addEventListener('click', zoomToMarker);

var timeStoneImage = document.getElementById('timeStone');
console.log("time" + timeStoneImage);
timeStoneImage.addEventListener('click', zoomToMarker);

function zoomToMarker() {
    var lat = this.getAttribute('data-lat');
    var lng = this.getAttribute('data-lng');

    if (lat && lng) {
        var latLng = L.latLng(parseFloat(lat), parseFloat(lng));
        map.setView(latLng, 8);
        marker.setLatLng(latLng);
    }
}

var customIcon = L.icon({
    iconUrl: 'assets/images/thanos.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: "ThanosMarker"
});

var thanosMarker = L.marker([-14.2350, -51.9253], { icon: customIcon }).addTo(map);

// Function to generate random latitude and longitude
function getRandomLatLng() {
    var lat = Math.random() * 180 - 90; // Random latitude between -90 and 90
    var lng = Math.random() * 360 - 180; // Random longitude between -180 and 180
    return [lat, lng];
}
var currentThanosLat;
var currentThanosLng;
// Function to update the Thanos marker with a random location
function updateThanosMarker() {
    // location.reload();
    var randomLatLng = getRandomLatLng();
    thanosMarker.setLatLng(randomLatLng);
    var currentLatLng = thanosMarker.getLatLng();
    currentThanosLat = currentLatLng.lat;
    currentThanosLng = currentLatLng.lng;
    console.log("Thanos Current Location  : "+currentThanosLat);
    console.log("Thanos Current Location  : "+currentThanosLng);
}

// Initial call to update the Thanos marker
updateThanosMarker();

// Call the updateThanosMarker function every 10 seconds
setInterval(updateThanosMarker, 10000);



// Function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude to radians
    const lat1Rad = degToRad(lat1);
    const lon1Rad = degToRad(lon1);
    const lat2Rad = degToRad(lat2);
    const lon2Rad = degToRad(lon2);

    // Calculate the differences between the latitudes and longitudes
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;

    // Apply the Haversine formula
    const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
var nearestStone;
function alert() {
    // Find the nearest stone to Thanos
    nearestStone = infinityJSONData.stones[0]; // Assume the first stone is the nearest initially
    var shortestDistance = calculateDistance(
        currentThanosLat,
        currentThanosLng,
        nearestStone.latitude,
        nearestStone.longitude
    );

    // Iterate through the stones and update the nearest stone if a closer one is found
    infinityJSONData.stones.forEach(function (stone) {
        var distance = calculateDistance(
            currentThanosLat,
            currentThanosLng,
            stone.latitude,
            stone.longitude
        );

        if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestStone = stone;
        }
    });
    // Output the name of the nearest stone
    console.log("The nearest stone to Thanos is: " + nearestStone.name);
    console.log(nearestStone);
    localStorage.setItem("nearestStone",JSON.stringify(nearestStone));
   
}
function navigateToChat(){
    alert();
    setTimeout(function(){
        window.location.href = "chat.html";
    },0);
    
}
function alertAvengers(){
    var nearestStone=JSON.parse(localStorage.getItem("nearestStone"));
    console.log(nearestStone.name);
    document.getElementById("alert-card-title").innerText=nearestStone.name;
    document.getElementById("alert-card-text").innerText=`Thanos is near to ${nearestStone.name} Take action and safegaurd it !`;
    
}

function rescueActionTaken() {
    var nearestStone=JSON.parse(localStorage.getItem("nearestStone"));
    let imgFileName = "rescued" + nearestStone.keyword;
    document.getElementById("alert-card-image").src = `assets/images/${imgFileName}.gif`;

    console.log(nearestStone.name + " action taken ");
}
function rescueActionDismissed() {
    var nearestStone=JSON.parse(localStorage.getItem("nearestStone"));
    let imgFileName = "captured" + nearestStone.keyword;
    document.getElementById("alert-card-image").src = `assets/images/${imgFileName}.gif`;
    console.log(nearestStone.name + " action dismissed ");
}