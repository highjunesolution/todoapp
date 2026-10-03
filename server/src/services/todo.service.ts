import { object } from "zod";
import prisma from "../config/prisma.js";
import type {
  TodoBodyInput,
  TodoBodyUpdateInput,
} from "../utils/schemas.util.js";

export const getAllTodo = () =>
  prisma.todo.findMany({ orderBy: { id: "desc" } });

export const getTodo = (id: number) =>
  prisma.todo.findFirst({ where: { id: Number(id) } });

export const createTodo = ({
  title,
  description,
  isCompleted,
}: TodoBodyInput) => {
  return prisma.todo.create({
    data: {
      title,
      ...(description && { description }),
      ...(isCompleted && { isCompleted }),
    },
  });
};

export const updateTodo = (
  id: number,
  { title, description, isCompleted }: TodoBodyUpdateInput,
) => {
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(isCompleted !== undefined && { isCompleted }),
      ...(isCompleted && { completedAt: new Date() }),
    },
  });
};

export const removeTodo = (id: number) => prisma.todo.delete({ where: { id } });
