import { Router } from "express";
import { OrderControler } from "./order.controller";

const router = Router();

// Route to create an order
router.post("/", OrderControler.createOrder);

// get all
router.get("/", OrderControler.getAllOrders);

// get all user
router.get("/:email", OrderControler.getAllOrdersByUser);

// update
router.put("/:id", OrderControler.updateOrder);

// delete
router.delete("/:id", OrderControler.deleteOrder);

export const OrderRoutes = router;
