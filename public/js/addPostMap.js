mapInit();

function mapInit() {
  const attribution =
    '&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ";
  const tiles = L.tileLayer(tileUrl, { attribution });
  const latlng = L.latLng(40.237049, 15.017532);
  const photoMap = L.map("photoMap", {
    center: latlng,
    zoom: 4,
    layers: [tiles]
  });

  tiles.addTo(photoMap);
  rightButtonOperations(photoMap);
}

function rightButtonOperations(photoMap) {
  let newMarker = new L.marker(40, 15);
  photoMap.on("contextmenu", function(e) {
    event.preventDefault();
    if (newMarker) {
      photoMap.removeLayer(newMarker);
    }
    newMarker = new L.marker(e.latlng).addTo(photoMap);
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    $("#imgMapLat").val(lat);
    $("#imgMapLng").val(lng);
    $("#latLng").text(lat + " , " + lng);
  });
  $("#addNewPost").on("click", () => {
    event.preventDefault();
    const imgUrl = $("#image").val();
    const lat = $("#imgMapLat").val();
    const lng = $("#imgMapLng").val();
    const title = $("#imgTitle").val();
    const descr = $("#imgDescr").val();
    $.ajax({
      url: "/admin/nowy-wpis",
      type: "post",
      data: {
        img: imgUrl,
        lat: lat,
        lng: lng,
        title: title,
        descr: descr
      },
      success: function(msg) {
        $("#image").val("");
        $("#imgMapLat").val("");
        $("#imgMapLng").val("");
        $("#imgTitle").val("");
        $("#imgDescr").val("");
        $("#imgPrev").empty();
        $("#latLng").text("");
      }
    });
  });
}
