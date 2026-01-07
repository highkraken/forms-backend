export const d = {
  dataTypeRequired: "Data Type is required.",
  labelRequired: "Label is required.",
  dateValueInvalid: "Date is invalid.",
  optionsRequired: "At least one option is required.",
  optionsApiRequired: "Provide necessary details for dynamic options.",
  optionsApiMethodRequired: "HTTP method is required for dynamic options.",
  optionsApiEndpointRequired: "API endpoint is required for dynamic options",
  selectVariantRequired: "Variant for 'select' data type is required.",
  selectVariantError:
    "Variant for 'select' data type is not properly structured.",
  textVariantError:
    "Variant for 'text' data type should only have 'multiline' boolean value.",
  defaultValueRequired:
    "Default value for text is required when static value is true.",
  textApiRequired: "Provide necessary details for dynamic default value.",
  textApiMethodRequired: "HTTP method is required for dynamic default value.",
  textApiEndpointRequired:
    "API endpoint is required for dynamic default value.",
  numberMinGreaterThanMax: "Minimum value cannot be larger than maximum value.",
  dateMinGreaterThanMax:
    "Minimum allowed date cannot be ahead of maximum allowed date.",
  minMaxError: "Minimum and maximum values are not proper.",
  regexError: "Regular expression is not valid.",
  beforeGreaterThanAfter: "Before date cannot be ahead of after date.",
  includeAfterError:
    "After date should be present to include it in date range.",
  includeBeforeError:
    "Before date should be present to include it in date range.",
  updateAttributeIdRequired: "Attribute ID is required for update.",
  attributeIdRequired: "Attribute ID is required.",
  attributeCreateSuccess: "Attribute created successfully.",
  attributeUpdateSuccess: "Attribute udpated successfully.",
  attributeDeleteSuccess: "Attribute deleted successfully.",
} as const;
