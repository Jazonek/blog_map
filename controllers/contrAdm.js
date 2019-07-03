const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/db.json");
const db = low(adapter);
const shortid = require("shortid");

exports.addReg = async (req, res) => {
  const { status, login } = res.locals;
  res.render("admin/addPhoto.pug", {
    title: "Login",
    log: { name: login, status: status }
  });
};
exports.allContent = async (req, res) => {
  const { status, login } = res.locals;
  const posts = db.get("posts").value();
  const comments = db.get("comments").value();
  res.render("admin/allContent.pug", {
    title: "Login",
    log: { name: login, status: status },
    posts: posts,
    comments: comments
  });
};
exports.newImg = async (req, res) => {
  const { img } = req.files;
  const path = "./public/img/photos/" + img.name;
  img.mv(path);
  const url = "/img/photos/" + img.name;
  db
    .get("images")
    .push({ id: shortid.generate(), url: url })
    .write().id;
  res.send("Dodano");
};
exports.addPost = async (req, res) => {
  const { img, title, descr, lat, lng } = req.body;
  const dbOper = await db
    .get("posts")
    .push({
      id: shortid.generate(),
      imgUrl: img,
      position: { lat: lat, lng: lng },
      title: title,
      description: descr
    })
    .write().id;
  res.send("success");
};
exports.removePost = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const remPost = await db
    .get("posts")
    .remove({ id: id })
    .write();
  const remComments = await db
    .get("comments")
    .remove({ postId: id })
    .write();
  res.send("Removed");
};
exports.removeComment = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const remComment = await db
    .get("comments")
    .remove({ id: id })
    .write();
  res.send("Removed");
};
exports.editPost = async (req, res) => {
  const { id, desc, title } = req.body;
  const updateTitle = await db
    .get("posts")
    .find({ id: id })
    .assign({ title: title })
    .assign({ description: desc })
    .write();
  res.send("Editet");
};
