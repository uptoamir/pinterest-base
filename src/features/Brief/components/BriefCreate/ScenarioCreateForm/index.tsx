import { useTheme } from "@mui/material";
import React, { FC, createRef, useEffect, useState } from "react";
import strings from "src/translations/translations";
import { FormItemType, TEXT_FIELD_TYPE } from "src/core/types/FormItemtypes";
import Button from "src/core/components/Button";
import InputTextField from "src/core/components/Inputs/InputTextField";
import { useUploadImageMutation } from "src/features/Brief/api/hooks";
import Icon from "src/core/components/Icon";
import { uuid4 } from "@sentry/utils";
import ScenarioImage from "./ScenarioImage";
import { useDispatch } from "react-redux";
import { setToastrMessage } from "src/core/redux/slices/toastrSlice";

type ScenarioCreateFormProps = {
	scenario: Scenario;
	removeScenario: (scenario_id: string) => void;
};

type BriefCreateItemType = FormItemType;

const nodes = [ createRef<HTMLInputElement>(), createRef<HTMLInputElement>() ];

const formItems: BriefCreateItemType[] = [
	{
		itemName: "description",
		type: TEXT_FIELD_TYPE.TEXT,
		autoFocused: true,
		nextRef: nodes[1],
		ref: nodes[0],
		label: "Description / Scenario",
		placeholder: "Tell us about the project",
	},
];

const ScenarioCreateForm: FC<ScenarioCreateFormProps> = ({ scenario, removeScenario }) => {
	const theme = useTheme();
	const [ files, setFiles ] = useState<FileObject[]>([]);
	const { mutate: postUploadImage, data } = useUploadImageMutation({
		onSuccess: (data) => {
			if (data.data.status.code === 201) {
				setFiles((prev) => {
					const targetIdx = prev.findIndex((file) => file.objectId === data.data.data.objectId);
					if (targetIdx < 0) {
						return prev;
					}
					const changedFile = { ...data.data.data };
					return [ ...prev.slice(0, targetIdx), changedFile, ...prev.slice(targetIdx + 1) ];
				});
			}
		},
		onError: (e, variables, context) => {
			setFiles((prev) => [ ...prev.filter((item) => item.objectId !== variables.objectId) ]);
		},
	});
	const dispatch = useDispatch();

	const handleFileRemoval = (fileId: string) => {
		setFiles((prev) => [ ...prev.filter((item) => item.objectId !== fileId) ]);
	};

	const handleFile = (files_: any) => {
		if (files_.length + files.length > 3) {
			dispatch(setToastrMessage({ message: strings.toast.maximum_files_selected, type: "info" }));
			return;
		}
		Array.from(files_).forEach((file: any) => {
			const formData = new FormData();
			formData.append("file", file);
			const newFile = { objectId: uuid4(), progress: 0, isUploading: true };
			setFiles((prev) => [ ...prev, newFile ]);
			postUploadImage({
				data: formData,
				objectId: newFile.objectId,
				onUploadProgressChange: (progress) => {
					setFiles((prev) => {
						const targetIdx = prev.findIndex((file) => file.objectId === newFile.objectId);
						if (targetIdx < 0) {
							return prev;
						}
						const changedFile = prev[targetIdx];
						changedFile.progress = progress;
						return [ ...prev.slice(0, targetIdx), changedFile, ...prev.slice(targetIdx + 1) ];
					});
				},
			});
		});
	};

	useEffect(
		() => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			scenario.related_media = files.filter((item) => item.id !== undefined).map((item) => item.id!.toString());
		},
		[ files ],
	);

	return (
		<div className="pt-4 flex flex-col">
			<InputTextField
				type={formItems[0].type}
				name={scenario.id + formItems[0].itemName}
				placeholder={formItems[0].placeholder}
				label={formItems[0].label}
				refInput={formItems[0].ref}
				inputclassname="w-full"
				autoComplete="false"
				handleChange={(e) => {
					scenario.description = e.target.value;
				}}
				iconName={formItems[0].iconName}
				unhandled
			/>
			<div className="flex flex-row items-center flex-wrap mt-4">
				{files.map((file) => (
					<ScenarioImage
						key={file.objectId}
						file={file}
						removeImage={(fileId: string) => {
							handleFileRemoval(fileId);
						}}
					/>
				))}

				{files.length < 3 && (
					<div
						className="relative border-2 border-dashed p-4 md:pb-1/4 rounded-md w-full md:w-1/4 m-4"
						style={{
							borderColor: theme.palette.primary.main,
						}}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							handleFile(e.dataTransfer.files);
						}}
					>
						<div className="absolute inset-0 flex justify-center items-center">
							<input
								type="file"
								multiple
								accept="image/*"
								onChange={(e) => handleFile(e.target.files)}
								className="hidden"
								id={`upload-button-${scenario.id}`}
							/>
							<label
								htmlFor={`upload-button-${scenario.id}`}
								className="absolute inset-0 flex justify-center items-center cursor-pointer"
							>
								<Icon icon="plus" size={30} color={theme.palette.primary.main} />
								<span className="mr-2" style={{ color: theme.palette.primary.main }}>
									{strings.brief_create_form.upload_image_action}
								</span>
							</label>
						</div>
					</div>
				)}
			</div>

			<Button
				backgroundColor="white"
				outlinedWidth={0}
				textColor={theme.palette.primary.main}
				outlinedColor={theme.palette.primary.main}
				outlined
				className="rounded-[15px] px-4 self-end"
				onClick={() => scenario.id && removeScenario(scenario.id)}
			>
				{strings.brief_create_form.remove_scenario_action}
			</Button>
		</div>
	);
};

export default ScenarioCreateForm;
