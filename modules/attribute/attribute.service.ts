import { d } from "../../constants/dictionary";
import { AppError } from "../../errors/AppError";
import { validateAttribute } from "../../utils/attribute-utils";
import { AttributeModel } from "./attribute.model";
import { IAttribute } from "./attribute.type";

export class AttribtueService {
  static async create(attribute: Partial<IAttribute>) {
    validateAttribute(attribute);
    return AttributeModel.create(attribute);
  }

  static async update(attribute: Partial<IAttribute>) {
    if (!attribute._id) throw new AppError(d.updateAttributeIdRequired, 400);
    validateAttribute(attribute);
    return AttributeModel.findByIdAndUpdate(attribute._id, attribute, {
      new: true,
    });
  }

  static async findById(id: string) {
    if (!id) throw new AppError(d.attributeIdRequired, 400);
    return AttributeModel.findById(id);
  }

  static async delete(id: string) {
    if (!id) throw new AppError(d.attributeIdRequired, 400);
    return AttributeModel.findByIdAndDelete(id);
  }
}
