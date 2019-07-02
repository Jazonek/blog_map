addImgBtn();
imgOp();
selImg();
function addImgBtn() {
  $("#imgAddBtn").on("click", () => {
    $("#imgAddForm").modal("toggle");
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
        console.log(chosenImg);
        $("#imgPrev").empty();
        const img = $('<img class="img-fluid rounded shadow preview">');
        img.attr("src", chosenImg).attr("alt");
        img.appendTo("#imgPrev");
        $("#image").val(chosenImg);
        $("#imgAddForm").modal("toggle");
      });
  });
}
function delImgs() {}
$("#subBtn").on("click", function() {
  $("#fileForm").submit();
});
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
        const img = $('<img class="img-fluid rounded shadow img">');
        img.attr("src", msg.url).attr("alt");
        img.appendTo("#images");
        img.on("click", function() {
          $(this).toggleClass("img-border shadow img chosen");
        });
      },
      cache: false,
      contentType: false,
      processData: false
    });

    e.preventDefault();
  });
  $("#fileForm").submit();
});
