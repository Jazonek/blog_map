const express = require("express");
const path = require("path");
const app = express();
const routesCont = require("./routes/routesCont");
const routesAdm = require("./routes/routesAdm");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//SESION

app.use(routesCont);
app.use("/admin", routesAdm);

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, () => console.log("May Node be with you"));
