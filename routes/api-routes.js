const express = require("express");
const router = express.Router();

const api = require("../controllers/api-rest");

router.get("/zdjecia", api.fetchAllImages);
router.get("/marker/:id", api.fetchMarkerInfo);
router.get("/posts", api.posts);
router.get("/comment/:id", api.markerComment);

module.exports = router;
