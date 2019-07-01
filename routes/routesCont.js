const express = require("express");
const router = express.Router();

const contrCont = require("../controllers/contrCont");

router.get("/", contrCont.mainPage);
router.get("/zaloguj", contrCont.loginPage);

module.exports = router;
