import { z } from "zod";

// Zod schemas for nested types
const ProductVariantSchema = z.object({
  type: z.string().min(1, "Variant type is required"), // Using min(1) instead of nonempty
  value: z.string().min(1, "Variant value is required"),
});

const InventoryDetailsSchema = z.object({
  quantity: z.number().min(0, "Quantity must be at least 0"),
  inStock: z.boolean().optional(), // Optional since it's not explicitly required
});

// Base schema for creating a product
const CreateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().min(5, "Description is required"),
    price: z.number().min(0, "Price must be at least 0"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()).optional(),
    variants: z.array(ProductVariantSchema).optional(),
    inventory: InventoryDetailsSchema,
  }),
});

// Schema for updating a product
const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    category: z.string().min(1).optional(),
    tags: z.array(z.string()).optional(),
    variants: z.array(ProductVariantSchema).optional(),
    inventory: InventoryDetailsSchema.optional(), // Allows partial updates
  }),
});

// Export schemas
export const productValidationSchema = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};
