import httpStatus from "http-status-codes";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { TOrder } from "./order.interface";
import Order from "./order.model";

// create
const createOrder = async (payload: TOrder) => {
  // checking order
  const isExistOrder = await Order.findOne({
    email: payload.email,
    productId: payload.productId,
  });

  if (isExistOrder) {
    throw new AppError(httpStatus.CONFLICT, "Already Ordered");
  }

  const result = await Order.create(payload);
  return result;
};

// get all
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const orderQuery = new QueryBuilder(Order.find().populate("productId"), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Order Available!");
  }

  return {
    meta,
    result,
  };
};

// get all by user
const getAllOrderByUserFromDB = async (email: string) => {
  // queryBuilder
  const result = await Order.find({ email: email });

  // checking data
  if (result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, "No Order Available!");
  }

  return result;
};

// update
const updateOrderIntoDB = async (_id: string, payload: Partial<TOrder>) => {
  // Order checking

  const result = await Order.findByIdAndUpdate(_id, payload, {
    new: true,
  });

  console.log(result);

  return result;
};

const deleteOrderIntoDB = async (_id: string) => {
  // Order checking
  const OrderData = await Order.findById(_id);
  if (!OrderData) {
    throw new AppError(StatusCodes.CONFLICT, "Order not exists!");
  }

  const result = await Order.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const orderService = {
  createOrder,
  getAllOrderFromDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getAllOrderByUserFromDB,
};
