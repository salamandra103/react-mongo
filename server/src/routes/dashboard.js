const express = require("express");

const router = express.Router();

const { requireAuth } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboard");

router.get("/", requireAuth, dashboardController.dashboardGet);
router.post("/", dashboardController.dashboardPost);
router.put("/", requireAuth, dashboardController.dashboardPut);
router.delete("/", requireAuth, dashboardController.dashboardDelete);

module.exports = router;
