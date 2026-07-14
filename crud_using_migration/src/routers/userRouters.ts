import express from "express";
import { Router } from "express";
import * as controller from "../controller/userController"

const router = Router();

router.post("/", controller.createUser);
router.get("/", controller.fetchAllUser);
router.get("/:id", controller.fetchSingleUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;