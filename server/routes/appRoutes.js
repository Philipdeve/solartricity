import express from "express";
const router = express.Router();

import multer, { memoryStorage } from "multer";
import {
  addCategory,
  fetchCategory,
  addProduct,
} from "../controllers/appController.js";
// import authenticateUser from "../middleware/auth.js";

const storage = memoryStorage();
const upload = multer({ storage });

router.route("/category").post(addCategory);
router.route("/category").get(fetchCategory);
router.route("/add-product").post(upload.single("image"), addProduct);
// router.route("/admin-signin").post(adminSignin);
// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
