const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const shortid = require("shortid");

exports.mainPage = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const posts = await db.get("posts").value();
  res.render("mainPage", {
    title: "MainPage",
    log: { name: "Admin", status: res.locals.status },
    potst: posts
  });
};
exports.loginPage = async (req, res) => {
  res.render("loginPage", {
    title: "Login",
    log: { name: "Admin", status: res.locals.status }
  });
};
exports.newComment = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { login, comment, postId } = req.body;
  db
    .get("comments")
    .push({
      id: shortid.generate(),
      postId: postId,
      login: login,
      comment: comment
    })
    .write().id;
  res.send("success");
};
exports.aboutMe = (req, res) => {
  res.render("aboutMe", {
    title: "Login",
    log: { name: "Admin", status: res.locals.status }
  });
};
