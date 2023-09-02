import express from "express";
const router = express.Router();

import { addCategory } from "../controllers/apiController.js";
// import authenticateUser from "../middleware/auth.js";

router.route("/category").post(addCategory);
// router.route("/admin-signin").post(adminSignin);
// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
