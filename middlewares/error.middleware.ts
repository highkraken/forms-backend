import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../errors/AppError";
import { mapMongooseError } from "../utils/mongoose-error.mapper";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let error: AppError;

  if (err instanceof mongoose.Error || err?.name === "MongoServerError") {
    error = mapMongooseError(err);
  } else if (err instanceof AppError) {
    error = err;
  } else {
    error = new AppError("Internal Server Error", 500);
  }

  return res.status(error.statusCode).json({
    message: error.message,
    errors: error.errors,
  });
};

export default errorHandler;
