import express from "express";
import validate from "../middlewares/validate.js";
import { todoschema } from "../validations/todo.validation.js";
import { addTodo, deleteTodo, getSingleTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/v1/task", getTodos);

router.post("/v1/task", validate(todoschema), addTodo);

router.put("/v1/task/:id", validate(todoschema), updateTodo);

router.get("/v1/task/:id", getSingleTodo);

router.delete("/v1/task/:id", deleteTodo);

export default router;