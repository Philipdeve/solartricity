import express from "express";
const router = express.Router();

import {  adminSignup, adminSignin } from "../controllers/authController.js";
// import authenticateUser from "../middleware/auth.js";

router.route("/admin-signup").post(adminSignup);
router.route("/admin-signin").post(adminSignin);
// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
