import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";


const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name | !email | !password) {
    throw new Error("Please Provide all values");
  }

  const isAdmin = true;
  const user = await User.create({ name, email, password, isAdmin });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token,
  });
};

const adminSignin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token});
};



export { adminSignup, adminSignin };
