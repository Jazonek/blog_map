const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");

exports.loggingIn = async (req, res) => {
  const { login, passwd } = req.body;
  let data = "=" + passwd;
  let buff = new Buffer.from(data);
  let decodedPasswd = buff.toString("base64");
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const user = db
    .get("users")
    .find({ name: login })
    .value();
  try {
    if (user.passwd === decodedPasswd) {
      req.session.login = login;
      req.session.status = true;
      res.redirect("/");
    } else {
      res.redirect("/logowanie");
    }
  } catch (error) {
    res.redirect("/logowanie");
  }
};
exports.logginOut = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    res.clearCookie();
    res.redirect("/");
  });
};
exports.redirectLogin = async (req, res, next) => {
  const { login, status } = req.session;
  if (login && status) {
    res.locals.status = status;
    res.locals.login = login;
    next();
  } else {
    res.redirect("/logowanie");
  }
};
exports.loginStatus = async (req, res, next) => {
  const { login, status } = req.session;
  if (login && status) {
    res.locals.login = login;
    res.locals.status = status;
    next();
  } else {
    res.locals.status = false;
    res.locals.login = "visitor";
    next();
  }
};
