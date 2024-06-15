const express = require("express");
const router = express.Router();

const validateFirebaseIdToken = require("../middlewares/validateFirebaseIdToken");
const authenticateWithPredefinedToken = require("../middlewares/authenticateWithPredefinedToken");

const { updateConfig, getConfig, deleteConfig, addConfig, serveConfig } = require("../controllers/configController");

router.put("/update/:id", validateFirebaseIdToken, updateConfig);
router.delete("/delete/:id", validateFirebaseIdToken, deleteConfig);
router.post("/add", validateFirebaseIdToken, addConfig);
router.get("/get", validateFirebaseIdToken, getConfig);
router.get("/serve", authenticateWithPredefinedToken, serveConfig)


module.exports = router;