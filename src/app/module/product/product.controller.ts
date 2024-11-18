import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import { Request, Response } from "express";

// create
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.creatProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});

// get all
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
});

// get single
const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
});

// update
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.updateProductIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// delete
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.deleteProductIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
};
