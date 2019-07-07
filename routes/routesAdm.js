const express = require("express");
const router = express.Router();

const contrAdm = require("../controllers/contrAdm.js");
const authent = require("../controllers/auth.js");

router.post("/nowe-zdjecie", authent.redirectLogin, contrAdm.newImg);
router.post("/gps-latlng", authent.redirectLogin, contrAdm.GPSImgLatLng);
router.post("/nowy-wpis", authent.redirectLogin, contrAdm.addPost);
router.post("/remove/post", authent.redirectLogin, contrAdm.removePost);
router.post("/remove/comment", authent.redirectLogin, contrAdm.removeComment);
router.post("/edit/post", authent.redirectLogin, contrAdm.editPost);
router.post("/usun-zdjecie", authent.redirectLogin, contrAdm.removeImgs);

router.get("/nowy-wpis", authent.redirectLogin, contrAdm.addReg);
router.get("/wszystkie-wpisy", authent.redirectLogin, contrAdm.allContent);

module.exports = router;
