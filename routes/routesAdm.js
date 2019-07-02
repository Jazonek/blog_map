const express = require("express");
const router = express.Router();

const contrAdm = require("../controllers/contrAdm.js");
const authent = require("../controllers/auth.js");

router.post("/nowe-zdjecie", authent.redirectLogin, contrAdm.newImg);
router.post("/nowy-wpis", authent.redirectLogin, contrAdm.addPost);

router.get("/nowy-wpis", authent.redirectLogin, contrAdm.addReg);
router.get("/wszystkie-wpisy", authent.redirectLogin, contrAdm.allContent);

module.exports = router;
