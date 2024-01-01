import express from "express";
const router = express.Router();

import {  adminSignup, adminSignin, userSignup, userSignin  } from "../controllers/authController.js";
// import authenticateUser from "../middleware/auth.js";

router.route("/admin-signup").post(adminSignup);
router.route("/admin-signin").post(adminSignin);
router.route("/signup").post(userSignup);
router.route("/signin").post(userSignin);
// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
