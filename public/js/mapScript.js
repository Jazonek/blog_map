const attribution =
  '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ";
const tiles = L.tileLayer(tileUrl, { attribution });
const latlng = L.latLng(52.237049, 21.017532);
const photoMap = L.map("photoMap", {
  center: latlng,
  zoom: 5,
  layers: [tiles]
});

tiles.addTo(photoMap);
const marker = L.marker(new L.latLng(52.237049, 21.017532)); // Create marker (s, few for example)
const marker1 = L.marker(new L.latLng(51.237049, 21.017532));
const marker2 = L.marker(new L.latLng(50.237049, 21.017532));
const marker3 = L.marker(new L.latLng(50.237049, 20.017532));
const markers = L.markerClusterGroup(); // create group of them 'markers'
markers.addLayer(marker); // Add all single markers to markers group
markers.addLayer(marker1);
markers.addLayer(marker2);
markers.addLayer(marker3);
photoMap.addLayer(markers); // Add markers group to map
markerOnClick(marker); // Add on click to markers
markerOnClick(marker1);
markerOnClick(marker2);
markerOnClick(marker3);

function markerOnClick(marker) {
  marker.on("click", () => {
    $("#markerModal").modal("toggle");
  });
}
