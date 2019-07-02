const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/db.json");
const db = low(adapter);
const shortid = require("shortid");

exports.mainPage = async (req, res) => {
  const comments = await db.get("comments").value();
  const posts = await db.get("posts").value();
  res.render("mainPage", {
    title: "MainPage",
    log: { name: "Admin", status: res.locals.status },
    comments: comments, //TODO: delete comments from there and make proxy to fetch them while pressing marker
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
  const { login, comment } = req.body;
  db
    .get("comments")
    .push({ id: shortid.generate(), login: login, comment: comment })
    .write().id;
  res.send("success");
};
