import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductDetails, updateProduct } from '../services/productApi'
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
    imageUrl: null,
    category: ""
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const data = await getProductDetails(id)
        setProduct({
          title: data.title || "",
          description: data.description || "",
          price: data.price?.toString() || "",
          rating: data.rating?.toString() || "",
          sizes: data.sizes
            ? data.sizes.join(",")
            : "",
          materialComposition:
            data.materialComposition || "",
          countryOfOrigin:
            data.countryOfOrigin || "",
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
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setProduct({
      ...product,
      imageUrl: URL.createObjectURL(file)
    });
  };

  // UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append( "description", product.description );
      formData.append("price", product.price);
      formData.append("rating", product.rating);
      formData.append("sizes", product.sizes);
      formData.append( "materialComposition", product.materialComposition );
      formData.append( "countryOfOrigin", product.countryOfOrigin );
      formData.append( "fitType", product.fitType );
      formData.append( "category", product.category );

      // IMAGE
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await updateProduct(id, formData)
      toast.success(
        "Product Updated Successfully!"
      );
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

        <form
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          {/* Basic Info */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">
              Basic Info
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Title
                </label>

                <input
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Price (₹)
                </label>

                <input
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition h-28 resize-none dark:text-gray-100"
              />
            </div>
          </section>

          {/* Product Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">
              Product Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Rating
                </label>

                <input
                  name="rating"
                  value={product.rating}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Sizes
                </label>

                <input
                  name="sizes"
                  value={product.sizes}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Material
                </label>

                <input
                  name="materialComposition"
                  value={
                    product.materialComposition
                  }
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Fit Type
                </label>

                <select
                  name="fitType"
                  value={product.fitType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                >
                  <option value="">
                    Select Fit Type
                  </option>

                  <option value="Regular Fit">
                    Regular Fit
                  </option>

                  <option value="Slim Fit">
                    Slim Fit
                  </option>

                  <option value="Loose Fit">
                    Loose Fit
                  </option>

                  <option value="Skinny Fit">
                    Skinny Fit
                  </option>

                  <option value="Fitted">
                    Fitted
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Country of Origin
                </label>

                <input
                  name="countryOfOrigin"
                  value={
                    product.countryOfOrigin
                  }
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-100">
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition dark:text-gray-100"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Men">
                    Men
                  </option>

                  <option value="Women">
                    Women
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* IMAGE */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-gray-200">
              Product Image
            </h3>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 rounded-lg border border-gray-300 
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 
              transition dark:text-gray-100"
            />

            {product.imageUrl && (
              <div className="mt-6 flex justify-center">
                <img
                  src={
                    product.imageUrl.startsWith(
                      "blob:"
                    )
                      ? product.imageUrl
                      : `${import.meta.env.VITE_BASE_URL}${product.imageUrl}`
                  }
                  alt="preview"
                  className="w-50 h-56 object-cover rounded-xl shadow-lg border"
                />
              </div>
            )}
          </section>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-400 md:hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg md:hover:scale-95 md:hover:shadow-xl transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;