const express = require("express");
const router = express.Router();
const taskRouter = require("./taskRouter")

router.use("/todos", taskRouter);
module.exports = router;
