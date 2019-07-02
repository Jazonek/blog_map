exports.loggingIn = async (req, res) => {
  const { login, passwd } = req.body;
  //TODO: Create 2 users in db hash password etc. make proper validation
  if (passwd) {
    req.session.login = login;
    req.session.status = true;
    res.redirect("/");
  } else {
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
