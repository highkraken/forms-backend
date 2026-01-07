import { d } from "../constants/dictionary";
import { DataType } from "../constants/value-datatype.type";
import { AppError } from "../errors/AppError";
import {
  IApiOptions,
  IAttribute,
  ISelectVariant,
  ITextVariant,
  IValidation,
} from "../modules/attribute/attribute.type";
import { isDateLike, isValidDate, toTimestamp } from "./date-utils";
import { isEmptyString } from "./string-utils";

export const isSelectVariant = (v: any): v is ISelectVariant => {
  const countTrue = (...vals: boolean[]) => vals.filter(Boolean).length === 1;

  if (!v || typeof v !== "object") return false;
  const hasCheckbox = Object.prototype.hasOwnProperty.call(v, "checkbox");
  const hasRadio = Object.prototype.hasOwnProperty.call(v, "radio");
  const hasDropdown = Object.prototype.hasOwnProperty.call(v, "dropdown");

  if (!countTrue(hasCheckbox, hasDropdown, hasRadio)) return false;

  if (hasDropdown) {
    const d = (v as any).dropdown;
    if (d && typeof d === "object") {
      if (Object.prototype.hasOwnProperty.call(d, "multiselect")) {
        if (typeof d.multiselect === "boolean") return true;
      }
    }
  }

  return false;
};

export const isTextVariant = (v: any): v is ITextVariant => {
  return (
    !!v &&
    typeof v === "object" &&
    "multiline" in v &&
    typeof (v as any).multiline === "boolean"
  );
};

export function validateAttribute(attribute: Partial<IAttribute>) {
  const {
    dataType,
    label,
    defaultValue,
    options,
    apiOptions,
    staticOptions,
    variant,
    validation,
  } = attribute;
  if (!dataType || !(Object.values(DataType) as string[]).includes(dataType))
    throw new AppError(d.dataTypeRequired, 400);

  if (!label || isEmptyString(label)) throw new AppError(d.labelRequired, 400);

  if (
    dataType === DataType.DATE &&
    typeof defaultValue === "string" &&
    !isValidDate(defaultValue)
  )
    throw new AppError(d.dateValueInvalid, 400);

  if (dataType === DataType.SELECT) {
    if (staticOptions) {
      if (!options || !options.length)
        throw new AppError(d.optionsRequired, 400);
    } else {
      validateApiOptionsOfAttribute(apiOptions, "options");
    }

    if (!variant) {
      throw new AppError(d.selectVariantRequired, 400);
    }
    if (!isSelectVariant(variant)) {
      throw new AppError(d.selectVariantError, 400);
    }
  }

  if (dataType === DataType.TEXT) {
    if (staticOptions) {
      if (isEmptyString(defaultValue as string | undefined))
        throw new AppError(d.defaultValueRequired, 400);
    } else {
      validateApiOptionsOfAttribute(apiOptions, "text");
    }

    if (variant && !isTextVariant(variant)) {
      throw new AppError(d.textVariantError, 400);
    }
  }

  if (validation) validateValidationOfAttribute(validation);
}

export function validateApiOptionsOfAttribute(
  apiOptions: IApiOptions | undefined,
  type: "options" | "text"
) {
  if (!apiOptions) {
    throw new AppError(d[`${type}ApiRequired`], 400);
  }
  if (
    !apiOptions.method ||
    isEmptyString(apiOptions.method) ||
    !["GET", "POST", "PATCH", "PUT"].includes(apiOptions.method.toUpperCase())
  ) {
    throw new AppError(d[`${type}ApiMethodRequired`], 400);
  }
  if (!apiOptions.endpoint || isEmptyString(apiOptions.endpoint)) {
    throw new AppError(d[`${type}ApiEndpointRequired`], 400);
  }
}

export function validateValidationOfAttribute(validation: IValidation) {
  const { min, max, regex, before, after, includeAfter, includeBefore } =
    validation;

  if (min !== undefined && max !== undefined) {
    if (typeof min === "number" && typeof max === "number") {
      if (min > max) throw new AppError(d.numberMinGreaterThanMax, 400);
    } else if (isDateLike(min) && isDateLike(max)) {
      const minDate = toTimestamp(min.toString()),
        maxDate = toTimestamp(max.toString());
      if (minDate > maxDate) throw new AppError(d.dateMinGreaterThanMax, 400);
    } else {
      throw new AppError(d.minMaxError, 400);
    }
  }

  if (regex) {
    try {
      new RegExp(regex);
    } catch (error) {
      throw new AppError(d.regexError, 400);
    }
  }

  if (before !== undefined && after !== undefined) {
    if (before > after) throw new AppError(d.beforeGreaterThanAfter, 400);
  }

  if (includeAfter !== undefined && after === undefined) {
    throw new AppError(d.includeAfterError, 400);
  }

  if (includeBefore !== undefined && before === undefined) {
    throw new AppError(d.includeBeforeError, 400);
  }
}
