//Posts table
$(document).ready(function() {
  $("#posts").DataTable();
});
//Comments table
$(document).ready(function() {
  $("#comments").DataTable();
});
delPost();
delComment();
editPost();

function updatePost(id) {
  $("#updatePost").on("click", () => {
    event.preventDefault();
    const data = {
      id: id,
      title: $("#newTitle").val(),
      desc: $("#newDescr").val()
    };
    $.ajax({
      url: "/admin/edit/post",
      type: "POST",
      data: data,
      success: () => {
        $("#newTitle").val("");
        $("#newDescr").val("");
      }
    });
  });
}

function editPost() {
  $(".editPost").on("click", function() {
    const id = $(this)
      .closest("tr")
      .find(".idP")
      .text();
    $("#newTitle").val(
      $(this)
        .closest("tr")
        .find(".title")
        .text()
    );
    $("#newDescr").val(
      $(this)
        .closest("tr")
        .find(".descr")
        .text()
    );
    updatePost(id);
    $("#editPostModal").modal("toggle");
  });
}

function delPost() {
  $(".remPost").on("click", function() {
    if (confirm("Jesteś pewny?")) {
      const id = $(this)
        .closest("tr")
        .find(".idP")
        .text();
      $.ajax({
        url: "/admin/remove/post",
        type: "POST",
        data: { id: id },
        success: function(data) {
          console.log(data);
        }
      });
    } else {
      return;
    }
  });
}
function delComment() {
  $(".remCom").on("click", function() {
    if (confirm("Jesteś pewny?")) {
      const id = $(this)
        .closest("tr")
        .find(".idC")
        .text();
      $.ajax({
        url: "/admin/remove/comment",
        type: "POST",
        data: { id: id },
        success: function(data) {
          console.log(data);
        }
      });
    } else {
      return;
    }
  });
}
