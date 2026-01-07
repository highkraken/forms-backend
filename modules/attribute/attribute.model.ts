import { Schema, model, Document } from "mongoose";
import { DataType } from "../../constants/value-datatype.type";
import {
  ConditionalUpdate,
  IApiOptions,
  IAttribute,
  IStaticOption,
  IValidation,
} from "./attribute.type";

// const conditionSchema = new Schema<ICondition>({
//   dependsOn: {
//     type: Schema.Types.ObjectId,
//     required: true,
//   },
//   operator: {
//     type: String,
//     enum: ["eq", "neq", "gt", "gte", "lt", "lte", "in", "nin", "contains"],
//     required: true,
//   },
//   dependencyValue: {
//     type: Schema.Types.Mixed,
//     required: true,
//   },
// });

// const conditionGroupSchema = new Schema<IConditionGroup>({
//   operator: {
//     type: String,
//     enum: ["AND", "OR"],
//     required: true,
//   },
//   conditions: [
//     {
//       type: Schema.Types.Mixed,
//       required: true,
//     },
//   ],
// });

// const dependencySchema = new Schema<IDependency>({
//   always: {
//     type: Boolean,
//     required: true,
//   },
//   dependency: {
//     type: Schema.Types.Mixed,
//   },
// });

// const selectVariantSchema = new Schema({
//   dropdown: {
//     multiselect: Boolean,
//   },
//   checkbox: Boolean,
//   radio: Boolean,
// });

// const textVariantSchema = new Schema({
//   multiline: {
//     type: Boolean,
//     required: true,
//   },
// });

const staticOptionSchema = new Schema<IStaticOption>({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
staticOptionSchema.set("strict", false);

const apiOptionsSchema = new Schema<IApiOptions>({
  method: {
    type: String,
    enum: ["GET", "POST"],
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  payload: {
    value: Schema.Types.Mixed,
  },
});

const conditionalUpdateSchema = new Schema<ConditionalUpdate>({
  prop: {
    type: String,
    enum: [
      "value",
      "defaultValue",
      "options",
      "apiOptions",
      "validation",
      "visible",
      "editable",
    ],
    required: true,
  },
  value: Schema.Types.Mixed,
  when: Schema.Types.Mixed,
});

const validationSchema = new Schema<IValidation>({
  required: Boolean,
  min: Schema.Types.Mixed,
  max: Schema.Types.Mixed,
  regex: String,
  before: Date,
  after: Date,
  includeBefore: Boolean,
  includeAfter: Boolean,
  message: String,
});

const attributeSchema = new Schema<IAttribute>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: Schema.Types.Mixed,
    defaultValue: Schema.Types.Mixed,
    dataType: {
      type: String,
      enum: Object.values(DataType),
      required: true,
    },
    variant: Schema.Types.Mixed,
    visible: Boolean,
    editable: Boolean,
    staticOptions: Boolean,
    options: [staticOptionSchema],
    apiOptions: apiOptionsSchema,
    conditionalUpdate: [conditionalUpdateSchema],
    validation: validationSchema,
  },
  { timestamps: true }
);

export const AttributeModel = model<IAttribute>("Attribute", attributeSchema);

export type AttributeDocument = IAttribute & Document;
