import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

//db config
import connectDB from './db/connect.js';

//routers
import authRouter from "./routes/authRoutes.js";
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'

//middleware
import errorHandlerMiddleware from "./middlewares/error-handler.js";

import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.raw({ type: 'application/json' }));

// app.use(express.urlencoded({ extended: true }));

app.get("/api/v1", async (req, res) => {
  res.json({ msg: "API App" });
});


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/app", productRouter);
app.use("/api/v1/app/order", orderRouter);

//middleware to ...
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL2);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}...`)
// })
