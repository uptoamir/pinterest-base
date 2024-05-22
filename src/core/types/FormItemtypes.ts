import { LegacyRef, RefObject } from "react";

export enum TEXT_FIELD_TYPE {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  NUMBER = "number",
  EMAIL = "email",
}

export type PropsFormComponents = {
  loading?: boolean;
  className?: string;
  onFormSubmit?: (() => void | undefined) | undefined | any;
  children?: React.ReactNode;
  formClassName?: string;
};

export type FormItemType = {
  itemName: string;
  label?: string;
  placeholder?: string;
  nextRef?: RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLElement | HTMLInputElement
  >;
  prevRef?: RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLElement | HTMLInputElement
  >;
  ref?:
    | RefObject<HTMLDivElement | HTMLInputElement>
    | LegacyRef<HTMLInputElement>;
  autoFocused?: boolean;
  validation?: () => void;
  onKeyPress?: () => void;
  disabled?: boolean;
  inputProps?: any;
  iconName?: string;
  type: TEXT_FIELD_TYPE;
  value?: string;
  className?: string;
};
export type OtpFields = {
  phone: string | undefined | number | null | object;
  code: number | undefined | string | null | object;
};
