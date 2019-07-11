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
  const markerGroup = L.layerGroup().addTo(photoMap);
  let newMarker = new L.marker(0, 0);
  rightButtonOperations(photoMap, newMarker, markerGroup);
  selImg(photoMap, newMarker, markerGroup);
}

function selImg(map, newMarker, group) {
  $("#chosImg").on("click", () => {
    if ($(".chosen").length > 1)
      alert("Wybierz tylko jedno zdjęcie w celu utworzenia postu");
    else
      $(".chosen").each(function() {
        const chosenImg = $(this).attr("src");
        $("#imgPrev").empty();
        const img = $('<img class="img-fluid rounded shadow preview">');
        img.attr("src", chosenImg).attr("alt");
        img.appendTo("#imgPrev");
        $("#image").val(chosenImg);

        $.ajax({
          url: "/admin/gps-latlng",
          type: "post",
          data: { url: chosenImg },
          success: function(data) {
            if (data.lat) {
              const splitL = data.lat + " ";
              const arrayL = splitL.split(/[,\ \.]+/);
              const lat1 = arrayL[0];
              const lat2 = arrayL[1] / 60;
              const lat3 = arrayL[2] / (60 * 60);
              let latitude = parseInt(lat1) + lat2 + lat3;
              data.latC == "S"
                ? (latitude = latitude * -1)
                : console.log(latitude);
              const split = data.lng + " ";
              const array = split.split(/[,\ \.]+/);
              const lng1 = array[0];
              const lng2 = array[1] / 60;
              const lng3 = array[2] / (60 * 60);
              let lngitude = parseInt(lng1) + lng2 + lng3;
              data.latC == "W"
                ? (lngitude = lngitude * -1)
                : console.log(lngitude);
              $("#latLng").text(`${latitude} , ${lngitude}`);
              $("#imgMapLat").val(latitude);
              $("#imgMapLng").val(lngitude);
              group.clearLayers();
              newMarker = new L.marker([latitude, lngitude]).addTo(group);
            } else if (data.code) {
              $("#latLng").text(``);
            }
          }
        });
        $("#imgAddForm").modal("toggle");
      });
  });
}

function rightButtonOperations(photoMap, newMarker, group) {
  photoMap.on("contextmenu", function(e) {
    event.preventDefault();

    // if (newMarker) {
    //   photoMap.removeLayer(newMarker);
    // }
    group.clearLayers();
    newMarker = new L.marker(e.latlng).addTo(group);
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
      statusCode: {
        500: response => {
          alert(response.responseText);
        }
      },
      success: response => {
        alert(response);
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
