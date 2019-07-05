const port = process.env.PORT || 3000;

const express = require("express");
const path = require("path");
const app = express();
const routesCont = require("./routes/routesCont");
const routesAdm = require("./routes/routesAdm");
const api = require("./routes/api-routes");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//SESION
app.use(
  session({
    name: "sid",
    secret: "somSecretKeys",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 60 * 100,
      sameSite: true
    }
  })
);
app.use(routesCont);
app.use("/admin", routesAdm);
app.use("/api", api);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { url: req.url, log: { name: "", status: false } });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.listen(port, () => console.log(`May Node be with you at ${port}`));
