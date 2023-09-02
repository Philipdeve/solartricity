import Category from "../models/Category.js";
import { StatusCodes } from "http-status-codes";

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    throw new Error("Please provide all values");
  }
  const category = await Category.create({ name, description });

  res.status(StatusCodes.CREATED).json({
    category
  });
};

const createProduct = async(req, res) => {
  
}

export  {addCategory};