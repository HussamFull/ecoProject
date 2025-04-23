import categoryModel from "../../../DB/models/category.model.js";
import productModel from "../../../DB/models/product.model.js";
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import { disconnect } from "mongoose";

// create category
export const create = async (req, res) => {
  const { name, categoryId } = req.body;

  const checkCategory = await categoryModel.findById(categoryId);
  if (!checkCategory) {
    return res.status(400).json({ message: "Category not found" });
  }
  req.body.slug = slugify(name);

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.mainImage[0].path,
    { folder: `${process.env.APP_NAME}/products/${name}` }
  );

  req.body.subImages = [];
  if (req.files.subImages) {
    for (const file of req.files.subImages) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        {
          folder: `${process.env.APP_NAME}/products/${name}/subImages`,
        }
      );
      req.body.subImages.push({ secure_url, public_id });
    }
  }

  req.body.mainImage = { secure_url, public_id };
  req.body.createdBy = req.id;
  req.body.updatedBy = req.id;

  const product = await productModel.create(req.body);

  return res.status(201).json({ message: "success Added product", product });
};

// get all products
export const get = async (req, res) => {
  const products = await productModel.find({}).select('name price categoryId  mainImage discount'); 
  return res.status(200).json({ message: "success get all products for Admin ", products });
};

// getActive product 

export const getActive = async (req, res) => {
  const products = await productModel.find({ status: 'active' }).select('name price categoryId  mainImage discount'); 
  return res.status(200).json({ message: "success getActive all products   ", products });
};

// getDetails
export const getDetails = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id).select('-discont');
  if (!product) {
    return res.status(400).json({ message: "product not found" });
  }
  return res.status(200).json({ message: "success get product details", product });
};