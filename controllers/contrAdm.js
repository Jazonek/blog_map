const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var ExifImage = require("exif").ExifImage;
const shortid = require("shortid");
const fs = require("fs");

exports.addReg = async (req, res) => {
  const { status, login } = res.locals;
  res.render("admin/addPhoto.pug", {
    title: "Login",
    log: { name: login, status: status }
  });
};
exports.allContent = async (req, res) => {
  const { status, login } = res.locals;
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
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
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { img } = req.files;
  const path = "./public/img/photos/" + img.name;
  img.mv(path);
  const url = "/img/photos/" + img.name;
  db
    .get("images")
    .push({ id: shortid.generate(), url: url })
    .write().id;

  res.send("success");
};
exports.GPSImgLatLng = async (req, res) => {
  const { url } = req.body;
  const path = `./public${url}`;
  try {
    new ExifImage({ image: path }, function(error, exifData) {
      if (error) {
        console.log("Error: " + error.message);
        res.send(error);
      } else {
        const lat = exifData.gps.GPSLatitude;
        const lng = exifData.gps.GPSLongitude;
        const latC = exifData.gps.GPSLatitudeRef;
        const lngC = exifData.gps.GPSLongitudeRef;
        const latlng = { lat: lat, lng: lng };
        res.send(latlng);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};
exports.addPost = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { img, title, descr, lat, lng } = req.body;
  const dbOper = await db
    .get("posts")
    .push({
      id: shortid.generate(),
      imgUrl: img,
      position: { lat: lat, lng: lng },
      title: title,
      description: descr,
      date: new Date()
    })
    .write().id;
  res.send("success");
};
exports.removePost = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { id } = req.body;
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
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { id } = req.body;
  const remComment = await db
    .get("comments")
    .remove({ id: id })
    .write();
  res.send("Removed");
};
exports.editPost = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { id, desc, title } = req.body;
  const updateTitle = await db
    .get("posts")
    .find({ id: id })
    .assign({ title: title })
    .assign({ description: desc })
    .write();
  res.send("Editet");
};
exports.removeImgs = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { imgs } = req.body;
  for (let img of imgs) {
    let delUrl = await db
      .get("images")
      .remove({ id: img.id })
      .write();
    fs.unlink(`./public${img.url}`, err => {
      if (err) throw err;
    });
  }
  res.send("Done");
};
