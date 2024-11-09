import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/Error";


const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  const statusCode = err.status || 500;

  const errorResponse = {
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
    data: err.data || null,
  };
  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
