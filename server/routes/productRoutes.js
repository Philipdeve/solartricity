import express from "express";
const router = express.Router();

import multer, { memoryStorage } from "multer";
import {
  addCategory,
  fetchCategory,
  addProduct, fetchSolarPanels, fetchBatteries, fetchInverters, getProductSlug, getProductId, getStockQuantity
} from "../controllers/productController.js";
// import authenticateUser from "../middleware/auth.js";

const storage = memoryStorage();
const upload = multer({ storage });

router.route("/category").post(addCategory);
router.route("/category").get(fetchCategory);
router.route("/add-product").post(upload.single("image"), addProduct);
router.route("/products/solar-panels").get(fetchSolarPanels);
router.route("/products/batteries").get(fetchBatteries);
router.route("/products/inverters").get(fetchInverters);
router.route("/product/slug/:slug").get(getProductSlug);
router.route("/product/:id").get(getProductId);
router.route("/product/stockquantity/:slug").get(getStockQuantity);
// router.route("/admin-signin").post(adminSignin);
// router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
