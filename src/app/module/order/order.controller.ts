import { Request, Response } from "express";
import { orderService } from "./order.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order created successfully!",
    data: result,
  });
});

// get all
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrderFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

// get all user
const getAllOrdersByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrderByUserFromDB(req.params.email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

// update
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await orderService.updateOrderIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrderIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const OrderControler = {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrder,
  getAllOrdersByUser,
};
