exports.addReg = async (req, res) => {
  res.render("admin/addPhoto.pug", {
    title: "Login",
    log: { name: "Admin", status: true }
  });
};
exports.allContent = async (req, res) => {
  res.render("admin/allContent.pug", {
    title: "Login",
    log: { name: "Admin", status: true }
  });
};
exports.newImg = async (req, res) => {
  console.log("Here");
  const { img } = req.files;
  img.mv("./public/img/photos/" + img.name);
  res.send("Dodano");
};
