import { Field, FieldInputProps, FieldMetaProps, FormikProps } from "formik";
import React, { memo, useState } from "react";
import { IInputTextFieldProps } from "src/core/types/InputsTypes";
import InputText from "../InputText";

const InputTextField: React.FC<IInputTextFieldProps> = ({ unhandled, ...props }) => {
	const [ textLength, setTextLength ] = useState(0);
	const [ value, setValue ] = useState();

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setTextLength(value.length);
	};

	const handleChange = (
		e: React.ChangeEvent<any>,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
	) => {
		const { name, value } = e.target;
		unhandled ? setValue(value) : setFieldValue(name, value);
		if (props.handleChange) {
			props.handleChange(e);
		}
	};

	return (
		<React.Fragment>
			<Field name={props.name}>
				{({
					field,
					form: { touched, errors, setFieldValue },
				}: {
					field: FieldInputProps<any>;
					form: FormikProps<any>;
					meta: FieldMetaProps<any>;
				}) => (
					<InputText
						{...props}
						field={field}
						value={unhandled ? undefined : field.value}
						handleChange={(e) => handleChange(e, setFieldValue)}
						errorMessage={errors[field.name]}
						isError={touched[field.name] && !!errors[field.name]}
						handleKeyUp={handleKeyUp}
						iconLeft
						left
					/>
				)}
			</Field>
		</React.Fragment>
	);
};

export default memo(InputTextField);
