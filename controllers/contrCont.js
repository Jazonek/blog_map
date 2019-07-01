exports.mainPage = async (req, res) => {
  res.render("mainPage", {
    title: "MainPage",
    log: { name: "Admin", status: true }
  });
};
exports.loginPage = async (req, res) => {
  res.render("loginPage", {
    title: "Login",
    log: { name: "Admin", status: true }
  });
};
