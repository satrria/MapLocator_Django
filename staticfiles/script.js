var map = L.map('map').setView([-6.4025, 106.7942], 13); // Pusatkan peta pada Depok dengan level zoom 13
var workshopLocation1 = L.marker([-6.4025, 106.7942]).bindPopup('Bengkel 1');
var workshopLocation2 = L.marker([-6.3913, 106.7996]).bindPopup('Bengkel 2');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

workshopLocation1.addTo(map); // Tambahkan marker Bengkel 1 ke peta
workshopLocation2.addTo(map); // Tambahkan marker Bengkel 2 ke peta

function showMarker(marker) {
    map.setView(marker.getLatLng(), 15); // Fokuskan peta pada marker yang dipilih dengan level zoom 15
    marker.openPopup(); // Buka popup pada marker
}

var userLocationMarker; // Variabel untuk menyimpan marker lokasi pengguna

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
            map.setView(userLatLng, 13); // Pusatkan peta pada lokasi pengguna dengan level zoom 13

            if (userLocationMarker) {
                userLocationMarker.setLatLng(userLatLng); // Perbarui posisi marker "Your Location" jika sudah ada
            } else {
                userLocationMarker = L.marker(userLatLng, { icon: userLocationIcon }).bindPopup('Your Location').addTo(map);
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
var userLocationIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});
function searchWorkshop() {
    var userAddress = document.getElementById('userAddress').value;
    if (userAddress.toLowerCase() === 'kelapa dua depok') {
        map.setView(workshopLocation1.getLatLng(), 15); // Fokuskan peta pada Bengkel 1
        workshopLocation1.openPopup(); // Buka popup Bengkel 1
        workshopLocation2.closePopup(); // Tutup popup Bengkel 2

        // Tampilkan marker "Your Location" jika alamat sesuai
        var userLocation = L.marker([-6.4025, 106.7942], { icon: userLocationIcon }).bindPopup('Your Location').addTo(map);
        userLocation.openPopup();
    } else if (userAddress.toLowerCase() === 'tugu depok') {
        map.setView(workshopLocation2.getLatLng(), 15); // Fokuskan peta pada Bengkel 2
        workshopLocation2.openPopup(); // Buka popup Bengkel 2
        workshopLocation1.closePopup(); // Tutup popup Bengkel 1

        // Tampilkan marker "Your Location" jika alamat sesuai
        var userLocation = L.marker([-6.3913, 106.7996], { icon: userLocationIcon }).bindPopup('Your Location').addTo(map);
        userLocation.openPopup();
    } else {
        alert("Alamat tidak valid atau tidak ada bengkel terdekat.");
        workshopLocation1.closePopup(); // Tutup popup Bengkel 1
        workshopLocation2.closePopup(); // Tutup popup Bengkel 2
    }
}

$(document).ready(function() {
    getUserLocation();
});
