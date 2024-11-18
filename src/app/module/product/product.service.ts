import httpStatus from "http-status-codes";
import Product from "./product.model";
import AppError from "../../error/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TProduct } from "./product.interface";
import { productSearchableFields } from "./product.constant";

// create
const creatProductIntoDB = async (payload: TProduct) => {
  // Product checking
  const isProductExists = await Product.findOne({
    name: payload.name,
    price: payload.price,
  });

  if (isProductExists) {
    throw new AppError(httpStatus.CONFLICT, "Product Already Created");
  }

  const result = await Product.create(payload);
  return result;
};

// get all
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // queryBuilder
  const ProductQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await ProductQuery.countTotal();
  const result = await ProductQuery.modelQuery;

  // checking data
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not available");
  }

  return {
    meta,
    result,
  };
};

// get single
const getSingleProductFromDB = async (_id: string) => {
  const result = await Product.findById(_id);

  // // checking data
  // if (result.length === 0) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Product not available");
  // }

  return result;
};

// update
const updateProductIntoDB = async (_id: string, payload: Partial<TProduct>) => {
  // Product checking
  const isProductExists = await Product.findById({ _id });
  if (!isProductExists) {
    throw new AppError(httpStatus.CONFLICT, "Product not available");
  }

  const result = await Product.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

// delete
const deleteProductIntoDB = async (_id: string) => {
  // Product checking
  const isProductExists = await Product.findById(_id);
  if (!isProductExists) {
    throw new AppError(httpStatus.CONFLICT, "Product not available");
  }

  const result = await Product.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  creatProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductIntoDB,
};
