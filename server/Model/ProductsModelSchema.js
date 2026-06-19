import mongoose from "mongoose";
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
    enum: ["Regular Fit", "Slim Fit", "Loose Fit", "Skinny Fit", "Fitted"],
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    default: ""
  },
  category: {
    type: String,
    enum: ["Men", "Women"]
  }
}, { timestamps: true });
itemsSchema.index({
  title: 1,
  description: 1,
  price: 1,
  category:1
})
export const items = mongoose.model('items', itemsSchema);