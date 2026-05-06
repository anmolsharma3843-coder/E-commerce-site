import mongoose from "mongoose";
const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required:true,
        default:false
    },
}, { timestamps: true })
const user = mongoose.model('users', usersSchema);
//items Schema
const itemsSchema = mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  sizes: {
    type: [String],
    required: true
  },
  materialComposition: {
    type: String,
    required: true
  },
  countryOfOrigin: {
    type: String,
    required: true
  },
  fitType: {
    type: String,
    enum: ["Regular Fit", "Slim Fit", "Loose Fit", "Skinny Fit","Fitted"],
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
   category:{
    type:String,
    enum:["Men","Women"]
   }
}, { timestamps: true });
const items = mongoose.model('items', itemsSchema);
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
const Cart = mongoose.model('carts', cartSchema);

export { user, items, Cart }

