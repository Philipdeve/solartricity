import Category from "../models/Category.js";
import { StatusCodes } from "http-status-codes";
import { uploadToS3 } from "./s3.js";
import Product from "../models/Product.js";

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

const fetchCategory = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json(categories);
}


const addProduct = async (req, res) => {
  const {file} = req;
  if (!file) {
    throw new Error("File not Found");
  }

  const { error, url } = await uploadToS3({ file });
  if (error) {
    throw new Error(error.message);
  }

  const { name, description, slug, brand, price, stockQuantity, category } = req.body;

  const product = new Product({
    name : name,
    description: description,
    slug: slug,
    brand: brand,
    price: price,
    stockQuantity: stockQuantity,
    image: url,
    category: category
   
  });

    
  await product.save();
  res.status(StatusCodes.CREATED).json({
    product
  });   
}

const fetchSolarPanels = async (req, res) => {
  const products = await Product.find({category: "Solar Panels"});
  res.status(StatusCodes.OK).json(products);
}

const fetchBatteries = async (req, res) => {
  const products = await Product.find({category: "Batteries"});
  res.status(StatusCodes.OK).json(products);
}

const fetchInverters = async (req, res) => {
  const products = await Product.find({category: "Inverters"});
  res.status(StatusCodes.OK).json(products);
}

const getProductSlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug});
  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    throw new Error("Product not Found");
  }
};

const getProductId = async (req, res) => {
  const product = await Product.findById(req.params.id );
  if (product) {
    res.status(StatusCodes.OK).json(product);
  } else {
    throw new Error("Product not Found");
  }
};

const getStockQuantity = async(req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if(product){
    res.status(StatusCodes.OK).json({
      stockQuantity: product.stockQuantity
    });
  }else {
    throw new Error("Product Quantity not Found");
  }

}

export  {addCategory, fetchCategory, addProduct, fetchSolarPanels, fetchBatteries, fetchInverters, getProductSlug, getProductId, getStockQuantity};
