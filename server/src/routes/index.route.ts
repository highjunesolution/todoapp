import { Router } from "express";
import todoRoutes from "./todo.route.js";
const router: Router = Router();

router.use("/todo", todoRoutes);

export default router;
