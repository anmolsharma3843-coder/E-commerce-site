import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    sizes: "",
    materialComposition: "",
    countryOfOrigin: "",
    fitType: "",
    imageUrl: "",
    category: ""   // ✅ Added category field
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5100/products/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(`Error:${response.status}`);
        setProduct({
          title: data.title || "",
          description: data.description || "",
          price: data.price?.toString() || "",
          rating: data.rating?.toString() || "",
          sizes: data.sizes ? data.sizes.join(",") : "",
          materialComposition: data.materialComposition || "",
          countryOfOrigin: data.countryOfOrigin || "",
          fitType: data.fitType || "",
          imageUrl: data.imageUrl || "",
          category: data.category || ""   
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5100/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          rating: Number(product.rating),
          sizes: product.sizes.split(",").map(s => s.trim())
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(`Error:${response.status}`);

      toast.success("Product Updated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 dark:bg-gray-900">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 p-10 dark:bg-gray-700">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-gray-200">
          ✏️ Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">Basic Info</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Title</label>
                <input name="title" value={product.title} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Price (₹)</label>
                <input name="price" value={product.price} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Description</label>
              <textarea name="description" value={product.description} onChange={handleChange} 
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition h-28 resize-none dark:text-gray-100" />
            </div>
          </section>

          {/* Product Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">Product Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Rating</label>
                <input name="rating" value={product.rating} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Sizes</label>
                <input name="sizes" value={product.sizes} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Material</label>
                <input name="materialComposition" value={product.materialComposition} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Fit Type</label>
                <select name="fitType" value={product.fitType} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100">
                  <option value="">Select Fit Type</option>
                  <option value="Regular Fit">Regular Fit</option>
                  <option value="Slim Fit">Slim Fit</option>
                  <option value="Loose Fit">Loose Fit</option>
                  <option value="Skinny Fit">Skinny Fit</option>
                  <option value="Fitted">Fitted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Country of Origin</label>
                <input name="countryOfOrigin" value={product.countryOfOrigin} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" />
              </div>
              {/* ✅ Category Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">Category</label>
                <select name="category" value={product.category} onChange={handleChange} 
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100">
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
            </div>
          </section>

          {/* Image Upload */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">Product Image</h3>
            <input name="imageUrl" value={product.imageUrl} onChange={handleChange} 
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100" placeholder="Paste Image URL" />
            {product.imageUrl && (
              <div className="mt-6 flex justify-center">
                <img src={product.imageUrl} alt="preview" className="w-56 h-56 object-cover rounded-xl shadow-lg border" />
              </div>
            )}
          </section>

          {/* Submit Button */}
          <button type="submit" 
            className="w-full bg-green-400 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-95 hover:shadow-xl transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
