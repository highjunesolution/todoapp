import type { NextFunction, Request, Response } from "express";
import * as todoService from "../services/todo.service.js";
import type { TodoBodyInput, TodoBodyUpdateInput } from "../utils/schemas.util.js";

export const listTodo = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await todoService.getAllTodo();
    return res.status(200).json({
      success: true,
      result: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodo(Number(id));
    return res.status(200).json({
      success: true,
      result: todo,
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (
  req: Request<{}, {}, TodoBodyInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const todo = await todoService.createTodo(req.body);
    return res.status(201).json({
      success: true,
      message: "todo is created!",
      result: todo
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req:Request<{id:string}, {}, TodoBodyUpdateInput>, res:Response, next:NextFunction) =>{
    try {
        const { id } = req.params
        const updated = await todoService.updateTodo(Number(id), req.body)
        return res.status(200).json({
            success: true,
            message: "Todo is updated",
            result: updated
        })
    } catch (error) {
        next(error)
    }
}

export const removeTodo = async (req:Request<{id:string}, {}, {}>, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params
        const removed = await todoService.removeTodo(Number(id));
        return res.status(200).json({
            success:true,
            message: `${removed.title} is removed`
        }) 
    } catch (error) {
        next(error)
    }
}
