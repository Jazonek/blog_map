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
        $("#imgAddForm").modal("toggle");
      });
  });
}
function delImgs() {
  $("#delImg").on("click", function() {
    if (confirm("Jesteś pewny?")) {
      $(".chosen").each(function() {
        $(this).hide();
      });
    } else {
      return;
    }
  });
}

//Sending photo to server
$("#fileInput").on("change", function() {
  $("#fileForm").submit(function(e) {
    const formData = new FormData($(this)[0]);
    $.ajax({
      url: "/admin/nowe-zdjecie",
      type: "POST",
      data: formData,
      success: function(msg) {
        alert(msg.msg);
        fetchImg();
      },
      cache: false,
      contentType: false,
      processData: false
    });

    e.preventDefault();
  });
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
