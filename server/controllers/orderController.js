import Order from "../models/Order.js";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import crypto from 'crypto';


const secret = process.env.PAYSTACK_SECRET_KEY;

const createCheckoutSession = async (req, res) => {
  const { email, orderItems, totalPrice, shippingAddress, user  } = req.body;


  const response = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    {
      email: email,
      amount: totalPrice * 100,
      metadata: {
        orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress,
        user: user
      },
    },
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    }
  );

  const authorizationUrl = response.data.data.authorization_url;

  res.status(StatusCodes.OK).json(authorizationUrl);
};


const webhookHandler = async (req, res) => {
 
  // const body = req.body.toString();
  // const jsonData = JSON.parse(body);


  const jsonData = req.body;

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(jsonData), "utf-8")
    .digest("hex");

  if (hash == req.headers["x-paystack-signature"]) {
    const event = jsonData.event;

    // Handle different Paystack events based on the `event` field
    if (event === "charge.success") {
      const newOrder = new Order({
        reference: jsonData.data.reference,
        orderItems: jsonData.data.metadata.orderItems,
        shippingAddress: jsonData.data.metadata.shippingAddress,
        user: jsonData.data.metadata.user,
        totalPrice: jsonData.data.requested_amount,
        payment_status: jsonData.data.gateway_response,
        
      });

      await newOrder.save();

      res.status(StatusCodes.OK);
    
    } else {
      throw new Error("Payment Event was not handled");
    }
  } else {
    // Invalid signature, ignore the webhook event
    throw new Error("Invalid Signature");
  }
};
export { createCheckoutSession, webhookHandler };
