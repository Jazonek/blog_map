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
  res.render("admin/allContent.pug", {
    title: "Login",
    log: { name: login, status: status }
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
  res.send({ msg: "Dodano", url: url });
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
