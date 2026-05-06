import Wishlist from "../Model/Wishlist.js";


// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [],
      });
    }

    res.json(wishlist.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Toggle Wishlist
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
  return res.status(400).json({ message: "Product ID required" });
}

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [],
      });
    }

    const exists = wishlist.products.some(
  (id) => id.toString() === productId
);

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    const populated = await wishlist.populate("products");

    res.json(populated.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};