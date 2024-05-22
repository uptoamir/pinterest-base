import { FieldInputProps, FormikErrors } from "formik";
import { Omit } from "lodash";
import { LegacyRef, PropsWithChildren, ReactNode, RefObject } from "react";

export enum TEXT_FIELD_TYPE {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  NUMBER = "number",
  EMAIL = "email",
}
export interface IInputTextProps {
  className?: string;
  name: string | null | undefined;
  type?: TEXT_FIELD_TYPE;
  label?: string;
  secondLabel?: string;
  required?: boolean;
  maxLength?: number;
  hasSeprator?: boolean;
  iconName?: string;
  iconLeft?: boolean;
  unit?: string | React.ReactNode;
  removeError?: boolean;
  iconClassName?: string;
  iconSize?: number;
  placeholder?: string;
  notPlaceHolderAsLabel?: boolean;
  disabled?: boolean;
  centered?: boolean;
  left?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  inputclassname?: string;
  labelClassName?: string;
  beforeContent?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  refInput?: RefObject<HTMLDivElement> | LegacyRef<HTMLInputElement>;
  value?: any;
  defaultValue?: any;
  field?: FieldInputProps<any>;
  isError?: boolean;
  errorMessage?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IInputTextFieldProps
  extends Omit<
    IInputTextProps,
    | "value"
    | "field"
    | "isError"
    | "errorMessage"
    | "handleChange"
    | "handleKeyUp"
    | "handleKeyPress"
  > {
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  unhandled?: boolean;
}

export type ITextAreaProps = Pick<
  IInputTextFieldProps,
  | "refInput"
  | "className"
  | "label"
  | "placeholder"
  | "iconClassName"
  | "iconSize"
  | "iconName"
  | "iconLeft"
  | "labelClassName"
> & {
  name: string;
  rows: number;
  inputclassname: string;
};
export interface IFormikCheckBoxProps<T> {
  id?: number | string;
  label:
    | PropsWithChildren<
        | IFormikCheckBoxProps<T>
        | (IFormikCheckBoxProps<T> & { children?: ReactNode })
      >
    | undefined
    | string;
  value?: T;
  name?: string;
  defaultValue?: boolean;
  checked?: boolean;
}

export interface IMyCheckBoxProps<T> extends IFormikCheckBoxProps<T> {
  onChange: (value?: T, name?: string) => void;
  labelComponent?: () => JSX.Element;
  activeClassName?: string;
}

export type IOptionsProps = {
  id: number;
  value: string | null;
  name: string;
};
export interface ISelectBoxProps {
  options: IOptionsProps[];
  name: string;
  lable?: string;
  lableDefaultOption?: string;
  size?: "small" | "medium";
  className?: string;
  defaultOptionLabel?: string;
  onChange?: (name: string, selectOption: IOptionsProps) => void;
  roundedLevel?: "normal" | "medium";
}

export interface INumericInputModeProps {
  minValue?: number;
  name: string;
  value: any;
  onChange?: (name: string, value: number | string) => void;
}
