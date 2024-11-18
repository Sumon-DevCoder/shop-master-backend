import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { productValidationSchema } from "./product.validation";

const router = Router();

// create Product
router.post(
  "/create-product",
  validateRequest(productValidationSchema.CreateProductValidationSchema),
  ProductControllers.createProduct
);

// get all Products
router.get("/", ProductControllers.getAllProducts);

// get single Product
router.get("/:id", ProductControllers.getSingleProducts);

// update Product
router.put(
  "/:id",
  validateRequest(productValidationSchema.UpdateProductValidationSchema),
  ProductControllers.updateProduct
);

// delete Product
router.delete("/:id", ProductControllers.deleteProduct);

export const ProductRoutes = router;
