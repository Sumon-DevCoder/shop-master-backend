import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { ProductRoutes } from "../module/product/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
