import { z } from "zod";

export const createOrderValidationSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().positive("Price must be a positive number").nonnegative(),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be a positive integer")
    .nonnegative(),
});

export const updateOrderValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .optional(),
  productId: z.string().min(1, "Product ID is required").optional(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .nonnegative()
    .optional(),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be a positive integer")
    .nonnegative()
    .optional(),
});

export const orderValidationSchema = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
