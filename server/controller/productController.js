import { items } from "../Model/UserModelSchema.js";

// GET list
export const getProductslist = async (req, res) => {
  const data = await items.find({}).limit(6);
  res.json(data);
};
//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await items.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};
// GET BY ID
export const getProductDetails = async (req, res) => {
  const product = await items.findById(req.params.id);
  res.json(product);
};


// 🔥 ADVANCED GET PRODUCTS
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

    // ✅ CATEGORY FILTER
    if (category) {
      query.category = category;
    }

    // ✅ PRICE FILTER
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // ✅ SEARCH (title)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // ✅ PAGINATION
    const skip = (page - 1) * limit;

    // ✅ SORTING
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
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD
export const addProduct = async (req, res) => {
  const product = await items.create(req.body);
  res.json(product);
};

// DELETE
export const deleteProduct = async (req, res) => {
  await items.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// UPDATE
export const updateProduct = async (req, res) => {
  const updated = await items.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const imagePath = `/uploads/products/${req.file.filename}`;

    const product = await items.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      sizes: req.body.sizes.split(","),
      materialComposition: req.body.materialComposition,
      countryOfOrigin: req.body.countryOfOrigin,
      fitType: req.body.fitType,
      category: req.body.category,
      imageUrl: imagePath,
    });

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Product upload failed",
    });
  }
};