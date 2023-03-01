const express = require('express');
const router = express.Router();
const apiExternalController = require("../controllers/apiExternalController");

router.get("/",apiExternalController.getExternalPhotos);

module.exports = router;