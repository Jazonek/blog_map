mapInit();
function mapInit() {
  const attribution =
    '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ";
  const tiles = L.tileLayer(tileUrl, { attribution });
  const latlng = L.latLng(40.237049, 15.017532);
  const photoMap = L.map("photoMap", {
    center: latlng,
    zoom: 2,
    layers: [tiles]
  });
  tiles.addTo(photoMap);
  getMarkers(photoMap);
}
async function getMarkers(map) {
  const posts = await fetch("/api/posts");
  const jsonPosts = await posts.json();
  const markers = L.markerClusterGroup();
  for (let marker of jsonPosts) {
    let newMarker = L.marker(
      new L.latLng(marker.position.lat, marker.position.lng),
      { myCustomId: marker.id, title: marker.title }
    );
    markerOnClick(newMarker, map);
    markers.addLayer(newMarker);
  }
  map.addLayer(markers);
}

function markerOnClick(marker, map) {
  marker.on("click", async function(e) {
    zoomMarker(map, marker).then(() => {
      map.on("zoomend", () => {
        $("#markerModal").modal("toggle");
      });
    });

    const data = await fetch(`/api/marker/${this.options.myCustomId}`);
    const json = await data.json();
    await fillModal(json);
  });
}
function zoomMarker(map, marker) {
  return new Promise((resolve, reject) => {
    map.flyTo(marker["_latlng"], 15);
    resolve();
  });
}
async function fillModal(data) {
  const img = `<img id="${data.id}" class="img-fluid mod-img shadow-sm" src="${
    data.imgUrl
  }" alt="${data.title}">`;
  $("#markerModalLabel").text(data.title);
  $("#imgDescr").text(data.description);
  $("#modalBody").empty();
  $("#modalBody").append(img);
  // const request = await fetch(`/api/comment/${data.id}`);
  // const reqJson = await request.json();
  // fillComments(reqJson);
}

function fillComments(data) {
  $("#comments").empty();
  if (data != 0) {
    $("#comments").append(`Komentarze`);
    if (data.length > 1) {
      for (let comm of data) {
        const comString = `<div class="container border border-light shadow p-3 mb-5 bg-white rounded comment"><div class="row"><div class="col-md"><span>${
          comm.login
        } </span><hr class="mt-1" /></div></div><div class="row"><div class="col-md"><span>${
          comm.comment
        }</span></div></div></div>`;
        $("#comments").append(comString);
      }
    } else {
      const comString = `<div class="container border border-light shadow p-3 mb-5 bg-white rounded comment"><div class="row"><div class="col-md"><span>${
        data[0].login
      } </span><hr class="mt-1" /></div></div><div class="row"><div class="col-md"><span>${
        data[0].comment
      }</span></div></div></div>`;
      $("#comments").append(comString);
    }
  } else {
    $("#comments").append(`<p>Brak kometarzy</p>`);
  }
}
