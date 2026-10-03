import { Router } from "express";
import {
  createTodo,
  getTodo,
  listTodo,
  removeTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import {
  validateBody,
  validateParams,
} from "../middlewares/validate.middleware.js";
import {
  todoBodySchema,
  todoBodyUpdateSchema,
  todoParamsSchema,
} from "../utils/schemas.util.js";
const router: Router = Router();

router.get("/list", listTodo);
router.get("/:id", validateParams(todoParamsSchema), getTodo);
router.post("/create", validateBody(todoBodySchema), createTodo);
router.put(
  "/update/:id",
  validateParams(todoParamsSchema),
  validateBody(todoBodyUpdateSchema),
  updateTodo,
);
router.delete("/remove/:id", validateParams(todoParamsSchema), removeTodo);

export default router;
