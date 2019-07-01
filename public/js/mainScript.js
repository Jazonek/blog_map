showComForm();

function showComForm() {
  $("#commBtn").on("click", function() {
    $("#formSpan").toggle("slow");
  });
}
