addImgBtn();
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
        success: () => {
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
    }" class="img-fluid img shadow rounded mod-img" src="${row.url}" alt="">`;
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
