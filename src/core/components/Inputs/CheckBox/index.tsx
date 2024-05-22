import React from "react";
import { Field, FieldInputProps, FormikProps } from "formik";
import { IFormikCheckBoxProps } from "src/core/types/InputsTypes";

const CustomCheckBox = <T,>({
  label,
  value,
  defaultValue,
  checked,
  ...props
}: IFormikCheckBoxProps<T>) => {
  return (
    <Field
      name={props.name}
      component={({
        field,
        form,
      }: {
        field: FieldInputProps<any>;
        form: FormikProps<any>;
      }) => (
        <div className="flex items-center justify-end dir-ltr">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <label
            onClick={() => {
              if (field.value.includes(value)) {
                const nextValue = field.value.filter(
                  (v: string | number | readonly string[] | undefined) =>
                    v !== value
                );
                form.setFieldValue(props.name as string, nextValue);
              } else {
                const nextValue = field.value.concat(value);
                form.setFieldValue(props.name as string, nextValue);
              }
            }}
            className="flex items-center cursor-pointer text-16 font-normal px-3"
          >
            {label as string}
            <span className="myBox" />
          </label>
        </div>
      )}
    />
  );
};

export default CustomCheckBox;
