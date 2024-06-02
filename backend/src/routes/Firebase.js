const express = require("express");
const router = express.Router();

const validateFirebaseIdToken = require("../middlewares/validateFirebaseIdToken");
const authenticateWithPredefinedToken = require("../middlewares/authenticateWithPredefinedToken");

const { updateConfig, getConfig, deleteConfig, addConfig } = require("../controllers/Firebase");

router.put("/update/:id", validateFirebaseIdToken, updateConfig);
router.delete("/delete/:id", validateFirebaseIdToken, deleteConfig);
router.post("/add", validateFirebaseIdToken, addConfig);
router.get("/get", authenticateWithPredefinedToken, getConfig);


module.exports = router;