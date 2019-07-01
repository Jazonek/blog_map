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
        $("#imgAddForm").modal("toggle");
      });
  });
}
function delImgs() {}
$("#subBtn").on("click", function() {
  $("#fileForm").submit();
});

$("#fileInput").on("change", function() {
  $("#fileForm").submit(function(e) {
    const formData = new FormData($(this)[0]);
    $.ajax({
      url: "/admin/nowe-zdjecie",
      type: "POST",
      data: formData,
      success: function(msg) {
        alert(msg);
      },
      cache: false,
      contentType: false,
      processData: false
    });

    e.preventDefault();
  });
  $("#fileForm").submit();
});
