showComForm();
addComment();
function showComForm() {
  $("#commBtn").on("click", function() {
    $("#formSpan").toggle("slow");
  });
}
function addComment() {
  $("#addComBtn").on("click", function(e) {
    e.preventDefault();
    const data = {
      login: $("#loginInput").val(),
      comment: $("#commentArea").val()
    };
    $.ajax({
      url: "/nowy-komentarz",
      type: "POST",
      data: data,
      success: function(response) {
        console.log(response);
      }
    });
    $("#formSpan").toggle("slow");
    $("#commentArea").val("");
    $("#loginInput").val("");
  });
}
