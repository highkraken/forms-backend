import { Request, Response } from "express";
import { AttribtueService } from "./attribute.service";
import asyncHandler from "../../middlewares/asyncHandler";
import { d } from "../../constants/dictionary";

export class AttributeController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const attribute = await AttribtueService.create(req.body);

    res.status(201).json({
      message: d.attributeCreateSuccess,
      data: attribute,
    });
  });
  static findById = asyncHandler(async (req: Request, res: Response) => {
    const attribute = await AttribtueService.findById(req.params.id);

    res.status(200).json({
      data: attribute,
    });
  });
  static update = asyncHandler(async (req: Request, res: Response) => {
    const attribute = await AttribtueService.update(req.body);

    res.status(200).json({
      message: d.attributeUpdateSuccess,
      data: attribute,
    });
  });
  static delete = asyncHandler(async (req: Request, res: Response) => {
    await AttribtueService.delete(req.params.id);

    res.status(200).json({
      message: d.attributeDeleteSuccess,
    });
  });
}
