const express = require("express");
const router = express.Router();
const controller = require("../controller/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, controller.getAllTask);
router.get("/:id",authMiddleware,controller.getSingleTask);


module.exports = router;