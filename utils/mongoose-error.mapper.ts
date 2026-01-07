import mongoose from "mongoose";
import { AppError } from "../errors/AppError";

export function mapMongooseError(err: any): AppError {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return new AppError("Validation failed", 400, errors);
  }

  if (err instanceof mongoose.Error.CastError) {
    return new AppError(`Invalid value for ${err.path}`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return new AppError(`${field} already exists`, 409, [
      { field, value: err.keyValue[field] },
    ]);
  }

  return new AppError(err.message || "Database error", 500);
}
