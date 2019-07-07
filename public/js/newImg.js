addImgBtn();
selImg();
delImgs();
function addImgBtn() {
  $("#imgAddBtn").on("click", async () => {
    $("#imgAddForm").modal("toggle");
    fetchImg();
  });
}

function imgOp() {
  $(".img").on("click", function() {
    $(this).toggleClass("img-border shadow img chosen");
  });
}
function selImg() {
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
              const latitude = parseInt(lat1) + lat2 + lat3;
              const split = data.lng + " ";
              const array = split.split(/[,\ \.]+/);
              const lng1 = array[0];
              const lng2 = array[1] / 60;
              const lng3 = array[2] / (60 * 60);
              const lngitude = parseInt(lng1) + lng2 + lng3;
              $("#latLng").text(`${latitude} , ${lngitude}`);
              $("#imgMapLat").val(latitude);
              $("#imgMapLng").val(lngitude);
            } else if (data.code) {
              $("#latLng").text(``);
            }
          }
        });
        $("#imgAddForm").modal("toggle");
      });
  });
}
function delImgs() {
  $("#delImg").on("click", function() {
    if (confirm("Jesteś pewny?")) {
      const imgs = [];
      $(".chosen").each(function() {
        imgs.push({ url: $(this).attr("src"), id: $(this).attr("id") });
      });
      $.ajax({
        url: "/admin/usun-zdjecie",
        type: "post",
        data: { imgs: imgs },
        succes: () => {
          fetchImg();
        }
      });
    } else {
      return;
    }
  });
}

//Sending photo to server
createSubmit();
function createSubmit() {
  $("#fileForm").submit(function(e) {
    const formData = new FormData($(this)[0]);
    $(this).val("");
    console.log(formData);
    $.ajax({
      url: "/admin/nowe-zdjecie",
      type: "POST",
      data: formData,
      success: function(msg) {
        fetchImg();
      },
      cache: false,
      contentType: false,
      processData: false
    });

    e.preventDefault();
  });
}
$("#fileInput").on("change", function() {
  $("#fileForm").submit();
});
function addImgToDiv(data) {
  //Appending images in modal
  $("#images").empty();
  for (let row of data) {
    const string = `<img id="${
      row.id
    }" class="img-fluid img shadow rounded" src="${row.url}" alt="">`;
    $("#images").append(string);
  }
}
async function fetchImg() {
  //Fetch all images and append modal
  const response = await fetch("/api/zdjecia");
  const data = await response.json();
  addImgToDiv(data);
  imgOp();
}
