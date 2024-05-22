import React, { createRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { TEXT_FIELD_TYPE } from "src/core/types/InputsTypes";
import {
  FormItemType,
  PropsFormComponents,
} from "src/core/types/FormItemtypes";
import Button, { BTN_HTML_TYPE } from "src/core/components/Button";
import InputTextField from "src/core/components/Inputs/InputTextField";
import CustomCheckBox from "src/core/components/Inputs/CheckBox";
import strings from "src/translations/translations";

type IUserNameAndPasswordFormProps = { forgetPasswordHandle: () => void };
type IInformationLoginProps = PropsFormComponents &
  IUserNameAndPasswordFormProps;
type UserNameAndPasswordType = FormItemType;

const nodes = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];

const formItems: UserNameAndPasswordType[] = [
  {
    itemName: "username",
    type: TEXT_FIELD_TYPE.TEXT,
    autoFocused: true,
    nextRef: nodes[1],
    ref: nodes[0],
    label: "Username",
    iconName: "user",
    validation: () => Yup.string().required("Username is required"),
  },
  {
    itemName: "password",
    type: TEXT_FIELD_TYPE.PASSWORD,
    autoFocused: false,
    label: "Password",
    ref: nodes[1],
    iconName: "password",
    validation: () => Yup.string().required("Password is required"),
  },
];

const UserNameAndPasswordForm: React.FC<IInformationLoginProps> = ({
  loading,
  onFormSubmit,
  className,
  forgetPasswordHandle,
  ...props
}) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        remember: [],
      }}
      validationSchema={Yup.object({
        username: formItems[0].validation?.() as any,
        password: formItems[1].validation?.() as any,
      })}
      onSubmit={(values) => {
        if (onFormSubmit) {
          const { remember, ...restValue } = values;
          const _tmp_values = restValue;
          onFormSubmit({ remember, ..._tmp_values });
        }
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ isSubmitting, handleSubmit, setSubmitting }) => (
        <form onSubmit={handleSubmit} className="flex flex-col w-full px-3">
          {formItems.map((item, idx) => (
            <div className="mt-2 py-1 sm:h-20 lg:h-24 flex flex-col" key={idx}>
              <InputTextField
                type={item.type}
                name={item.itemName}
                placeholder={item.label}
                refInput={item.ref}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    if (idx === formItems.length - 1) setSubmitting(true);
                    item.nextRef && item.nextRef.current?.focus();
                  }
                }}
                inputclassname="w-full"
                autoComplete="false"
                iconName={item.iconName}
              />
            </div>
          ))}
          <div className="flex flex-row justify-between items-center px-1 pt-2 sm:pt-0">
            <CustomCheckBox<string>
              label="Remember me"
              value="remember"
              name="remember"
              id="remember"
            />
          </div>

          <Button
            variant="primary"
            htmlType={BTN_HTML_TYPE.SUBMIT}
            fullWidth={true}
            loading={loading}
            className="flex-1 rounded-[15px] px-4 py-2 mt-4"
          >
            {strings.auth.login}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default UserNameAndPasswordForm;
