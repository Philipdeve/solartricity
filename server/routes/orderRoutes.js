import express from "express";
const router = express.Router();

import {
  createCheckoutSession,
  webhookHandler,
} from "../controllers/orderController.js";

router.route("/paystack/create-checkout-session").post(createCheckoutSession);
router.route("/paystack/webhook").post(webhookHandler);

export default router;
