const express = require("express");
const router = express.Router();

const contrCont = require("../controllers/contrCont");
const authent = require("../controllers/auth");
router.post("/logowanie", authent.loginStatus, authent.loggingIn);
router.post("/wyloguj", authent.redirectLogin, authent.logginOut);
router.post("/nowy-komentarz", contrCont.newComment);

router.get("/", authent.loginStatus, contrCont.mainPage);
router.get("/about", authent.loginStatus, contrCont.aboutMe);
router.get("/logowanie", authent.loginStatus, contrCont.loginPage);
module.exports = router;
