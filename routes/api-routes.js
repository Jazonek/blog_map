const express = require("express");
const router = express.Router();

const api = require("../controllers/api-rest");

router.get("/zdjecia", api.fetchAllImages);
router.get("/markerData", api.fetchMarkerInfo);

module.exports = router;
