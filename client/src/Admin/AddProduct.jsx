import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProductApi } from "../services/productApi";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    sizes: "",
    materialComposition: "",
    countryOfOrigin: "",
    fitType: "",
    image: null,
    category: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProduct({
      ...product,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // IMAGE
    formData.append("image", product.image);

    // OTHER FIELDS
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("rating", product.rating);
    formData.append("sizes", product.sizes);
    formData.append(
      "materialComposition",
      product.materialComposition
    );
    formData.append(
      "countryOfOrigin",
      product.countryOfOrigin
    );
    formData.append("fitType", product.fitType);
    formData.append("category", product.category);

    const data = await addProductApi(formData)
    if (data.success) {
      toast.success("Product Added Successfully!");

      setProduct({
        title: "",
        description: "",
        price: "",
        rating: "",
        sizes: "",
        materialComposition: "",
        countryOfOrigin: "",
        fitType: "",
        image: null,
        category: "",
      });

      setPreview("");
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Upload failed");
  }
};

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 
      bg-gray-100 dark:bg-gray-900"
    >
      <div
        className="max-w-7xl mx-auto grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 space-y-5 sm:space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Add Product
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Create a new product for your store
            </p>
          </div>

          {/* Basic Info */}
          <div
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 
            rounded-2xl border shadow-sm space-y-4 sm:space-y-5"
          >
            <h2 className="font-medium text-gray-700 dark:text-gray-200">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input
                label="Title"
                name="title"
                value={product.title}
                onChange={handleChange}
              />

              <Input
                label="Price ₹"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <InputArea
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          {/* Details */}
          <div
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 
            rounded-2xl border shadow-sm space-y-4 sm:space-y-5"
          >
            <h2 className="font-medium text-gray-700 dark:text-gray-200">
              Product Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Input
                label="Rating"
                name="rating"
                value={product.rating}
                onChange={handleChange}
              />

              <Input
                label="Sizes"
                name="sizes"
                value={product.sizes}
                onChange={handleChange}
              />

              <Input
                label="Material"
                name="materialComposition"
                value={product.materialComposition}
                onChange={handleChange}
              />

              <Input
                label="Country"
                name="countryOfOrigin"
                value={product.countryOfOrigin}
                onChange={handleChange}
              />

              <Select
                label="Fit Type"
                name="fitType"
                value={product.fitType}
                onChange={handleChange}
              >
                <option value="">Select Fit</option>
                <option>Regular Fit</option>
                <option>Slim Fit</option>
              </Select>

              <Select
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option>Men</option>
                <option>Women</option>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 
            rounded-2xl border shadow-sm space-y-4 sm:space-y-5"
          >
            <h2 className="font-medium text-gray-700 dark:text-gray-200">
              Product Image
            </h2>

            <div>
              <label
                className="block text-xs sm:text-sm mb-1 sm:mb-2 
                text-gray-600 dark:text-gray-300"
              >
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2.5 sm:p-3 rounded-lg border 
                bg-white dark:bg-gray-700 
                text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full bg-indigo-600 text-white 
            py-2.5 sm:py-3 rounded-xl font-medium 
            md:hover:bg-indigo-700 transition"
          >
            Add Product
          </button>
        </form>

        {/* PREVIEW */}
        <div
          className="md:col-span-2 lg:col-span-1 
          lg:sticky lg:top-6 h-fit"
        >
          <div
            className="bg-white dark:bg-gray-800 p-4 sm:p-5 
            rounded-2xl border shadow-sm"
          >
            <h2
              className="text-base sm:text-lg font-medium mb-3 sm:mb-4 
              text-gray-700 dark:text-gray-200"
            >
              Live Preview
            </h2>

            <div className="border rounded-xl overflow-hidden shadow-sm">
              <img
                src={
                  preview ||
                  "https://via.placeholder.com/400"
                }
                className="w-full h-40 sm:h-52 md:h-60 object-cover"
                alt="preview"
              />

              <div className="p-3 sm:p-4 space-y-2">
                <h3
                  className="font-semibold text-sm sm:text-base 
                  text-gray-800 dark:text-gray-100"
                >
                  {product.title || "Product Title"}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {product.description ||
                    "Product description..."}
                </p>

                <div className="flex justify-between items-center">
                  <span
                    className="text-base sm:text-lg 
                    font-bold text-indigo-600"
                  >
                    ₹{product.price || "0"}
                  </span>

                  <span className="text-xs sm:text-sm text-yellow-500">
                    ⭐ {product.rating || "0"}
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  {product.category || "Category"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */

const Input = ({ label, ...props }) => (
  <div>
    <label
      className="block text-xs sm:text-sm mb-1 sm:mb-2 
      text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>

    <input
      {...props}
      className="w-full p-2.5 sm:p-3 rounded-lg border 
      bg-white dark:bg-gray-700 
      text-gray-800 dark:text-gray-100
      focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>
);

const InputArea = ({ label, ...props }) => (
  <div>
    <label
      className="block text-xs sm:text-sm mb-1 sm:mb-2 
      text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>

    <textarea
      {...props}
      className="w-full p-2.5 sm:p-3 h-20 sm:h-24 rounded-lg border 
      bg-white dark:bg-gray-700 
      text-gray-800 dark:text-gray-100"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label
      className="block text-xs sm:text-sm mb-1 sm:mb-2 
      text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>

    <select
      {...props}
      className="w-full p-2.5 sm:p-3 rounded-lg border 
      bg-white dark:bg-gray-700 
      text-gray-800 dark:text-gray-100"
    >
      {children}
    </select>
  </div>
);

export default AddProduct;