const express = require("express");
const router = express.Router();

const contrAdm = require("../controllers/contrAdm.js");

router.get("/nowy-wpis", contrAdm.addReg);
router.get("/wszystkie-wpisy", contrAdm.allContent);

router.post("/nowe-zdjecie", contrAdm.newImg);

module.exports = router;
