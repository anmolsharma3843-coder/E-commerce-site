import mongoose from "mongoose";


const CartItemsSchema = mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  imageUrl: String,
  qty: {
    type: Number,
    default: 1,
  },

})
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [CartItemsSchema],
});
export const Cart = mongoose.model('carts', cartSchema);