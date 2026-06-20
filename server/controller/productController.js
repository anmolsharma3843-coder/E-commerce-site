import { items } from "../Model/ProductsModelSchema.js";
import cloudinary from "../Config/cloudinary.js";
import fs from "fs";

/**
 * GET PRODUCTS (LIST)
 */
export const getProductslist = async (req, res) => {
  try {
    const data = await items.find({}).limit(6);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list" });
  }
};

/**
 * GET ALL PRODUCTS
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await items.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/**
 * GET PRODUCT BY ID
 */
export const getProductDetails = async (req, res) => {
  try {
    const product = await items.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Product not found" });
  }
};

/**
 * ADVANCED PRODUCT FILTERING
 */
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sort,
      search,
      page = 1,
      limit = 8,
    } = req.query;

    let query = {};

    if (category) query.category = category;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * Number(limit);

    let sortOption = {};
    if (sort === "low") sortOption.price = 1;
    if (sort === "high") sortOption.price = -1;
    if (sort === "rating") sortOption.rating = -1;

    const products = await items
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await items.countDocuments(query);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    fs.unlinkSync(req.file.path);

    const {
      title,
      description,
      price,
      rating,
      sizes,
      materialComposition,
      countryOfOrigin,
      fitType,
      category,
    } = req.body;

    const product = await items.create({
      title,
      description,
      price: Number(price),
      rating: Number(rating || 0),
      sizes: sizes ? sizes.split(",") : [],
      materialComposition,
      countryOfOrigin,
      fitType,
      category,
      imageUrl: result.secure_url,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Product upload failed",
    });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      fs.unlinkSync(req.file.path);

      updateData.imageUrl = result.secure_url;
    }

    if (updateData.sizes) {
      updateData.sizes = updateData.sizes.split(",");
    }

    const updated = await items.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    await items.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};