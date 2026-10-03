import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../utils/sendErr.util.js";

export const handleError = (err:AppError, _req:Request, res:Response, next:NextFunction)=>{
    return res.status(err.code || 500).json({
        success: false,
        message: err.message || "Internal server err"
    })
}