import express from "express";
import dotenv from 'dotenv';


//db config
import connectDB from './db/connect.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware to ...
// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

const port = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URL2);
//     app.listen(port, () => {
//       console.log(`Server is listening on port ${port}...`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})
