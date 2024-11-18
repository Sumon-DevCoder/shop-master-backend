import mongoose, { Schema } from "mongoose";
import {
  TInventoryDetails,
  TProduct,
  TProductVariant,
} from "./product.interface";

// Mongoose schema
const ProductVariantSchema: Schema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventoryDetailsSchema: Schema = new Schema<TInventoryDetails>({
  quantity: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, default: true },
});

const ProductSchema: Schema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  variants: { type: [ProductVariantSchema], default: [] },
  inventory: { type: InventoryDetailsSchema, required: true },
});

// Mongoose model
const Product = mongoose.model<TProduct>("Product", ProductSchema);
export default Product;
