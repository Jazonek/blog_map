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
      postId: $(".mod-img").attr("id"),
      login: $("#loginInput").val(),
      comment: $("#commentArea").val()
    };
    $.ajax({
      url: "/nowy-komentarz",
      type: "POST",
      data: data,
      success: function() {
        const comString = `<div class="container border border-light shadow p-3 mb-5 bg-white rounded comment"><div class="row"><div class="col-md"><span>${
          data.login
        } </span><hr class="mt-1" /></div></div><div class="row"><div class="col-md"><span>${
          data.comment
        }</span></div></div></div>`;
        $("#comments").append(comString);
        $("#formSpan").toggle("slow");
        $("#commentArea").val("");
        $("#loginInput").val("");
      }
    });
  });
}
