import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema: Schema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true, ref: "ProductId" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model<TOrder>("Order", orderSchema);
export default Order;
