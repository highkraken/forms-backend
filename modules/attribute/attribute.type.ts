import { Types } from "mongoose";
import { AttributeValue, DataType } from "../../constants/value-datatype.type";

export interface ICondition {
  dependsOn: Types.ObjectId;
  sectionOfDependsOn: Types.ObjectId;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "contains";
  dependencyValue: AttributeValue;
}

export interface IConditionGroup {
  operator: "AND" | "OR";
  conditions: DependencyExpression[];
}

export type DependencyExpression = ICondition | IConditionGroup;

// export interface IDependency {
//   always: boolean;
//   dependency?: DependencyExpression;
// }

export interface ISelectVariant {
  dropdown?: {
    multiselect: boolean;
  };
  checkbox?: boolean;
  radio?: boolean;
}

export interface ITextVariant {
  multiline: boolean;
}

export type AttributeVariant = ISelectVariant | ITextVariant;

export interface IStaticOption {
  id: string;
  label: string;
  // allow extra keys
  [key: string]: any;
}

export interface IApiOptions {
  method: "GET" | "POST";
  endpoint: string;
  payload?: {
    value: AttributeValue;
  };
}

export type ConditionalUpdate =
  | {
      prop: "value" | "defaultValue";
      value: AttributeValue;
      when: DependencyExpression;
    }
  | {
      prop: "options";
      value: IStaticOption[];
      when: DependencyExpression;
    }
  | {
      prop: "apiOptions";
      value: IApiOptions;
      when: DependencyExpression;
    }
  | {
      prop: "validation";
      value: IValidation;
      when: DependencyExpression;
    }
  | {
      prop: "visible";
      value: boolean;
      when: DependencyExpression;
    }
  | {
      prop: "editable";
      value: boolean;
      when: DependencyExpression;
    };

export interface IValidation {
  required?: boolean;
  min?: number | Date;
  max?: number | Date;
  regex?: string;
  before?: Date;
  after?: Date;
  includeBefore?: boolean;
  includeAfter?: boolean;
  message?: string;
}

export interface IAttribute {
  _id: Types.ObjectId;

  label: string;

  value?: AttributeValue;

  defaultValue?: AttributeValue;

  dataType: DataType;

  /**
   * Required for select & optional for text
   */
  variant?: AttributeVariant;

  visible?: boolean;

  editable?: boolean;

  helperText?: string;

  placeholder?: string;

  /**
   * Required for select & text
   */
  staticOptions?: boolean;

  /**
   * Required when staticOptions = true
   */
  options?: IStaticOption[];

  /**
   * Required when staticOptions = false
   */
  apiOptions?: IApiOptions;

  /**
   * Conditional updates based on other attributes
   */
  conditionalUpdate?: ConditionalUpdate[];

  validation?: IValidation;
}
