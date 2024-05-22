import React, { FC, createRef, useEffect } from "react";
import BriefCreateFormSubmit from "./BriefCreateFormSubmit";
import * as Yup from "yup";
import { Formik } from "formik";
import { TEXT_FIELD_TYPE } from "src/core/types/InputsTypes";
import {
  FormItemType,
} from "src/core/types/FormItemtypes";
import InputTextField from "src/core/components/Inputs/InputTextField";
import useBriefCreate from "./useBriefCreate";
import ScenarioCreateForm from "../ScenarioCreateForm";
import Button from "src/core/components/Button";
import { useTheme } from "@mui/material/styles";
import strings from "src/translations/translations";
import { uuid4 } from "@sentry/utils";
import { useRouter } from "next/router";
import { BRIEF_LIST } from "src/core/routes";
import { useDispatch } from "react-redux";
import { setToastrMessage } from "src/core/redux/slices/toastrSlice";

type BriefCreateItemType = FormItemType;

const nodes = [createRef<HTMLInputElement>(), createRef<HTMLInputElement>()];

const formItems: BriefCreateItemType[] = [
  {
    itemName: "name",
    type: TEXT_FIELD_TYPE.TEXT,
    autoFocused: true,
    nextRef: nodes[1],
    ref: nodes[0],
    label: "Name",
    placeholder: "Enter the brief name",
    validation: () => Yup.string().required("Name is required"),
  },
];

type BriefCreateFormProps = object;

const BriefCreateForm: FC<BriefCreateFormProps> = (props) => {
    const { onFormSubmit, scenarios, setScenarios, isSuccess, isCreateBriefApiLoading } = useBriefCreate();
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
			dispatch(setToastrMessage({ message: strings.brief_create_form.brief_create_success, type: "success" }));
      router.push(BRIEF_LIST);
    }
  }, [isSuccess])

	return (
		<div className="flex flex-col flex-1 items-start w-full">
			<Formik
      initialValues={{
        name: "",
        scenarios: [],
      }}
      validationSchema={Yup.object({
        name: formItems[0].validation?.() as any,
      })}
      onSubmit={(values) => {
          const newScenarios = scenarios.map(item => {
              return {
                description: item.description,
                related_media: item.related_media,
              }
          });
          onFormSubmit({ ...values, scenarios: newScenarios });
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 w-full justify-between px-3">
          <div className="flex flex-col space-y-2 pb-4">
          {formItems.map((item, idx) => (
            <div 
              className="mt-2 py-1 sm:h-20 lg:h-24 flex flex-col" 
              key={idx}
            >
              <InputTextField
                type={item.type}
                name={item.itemName}
                placeholder={item.placeholder}
                label={item.label}
                refInput={item.ref}
                className="max-w-100"
                inputclassname="w-full"
                autoComplete="false"
                iconName={item.iconName}
              />
            </div>
          ))}
            {scenarios.map((item, idx) => (
              <ScenarioCreateForm 
                key={item.id} 
                scenario={item} 
                removeScenario={(scenario_id: string) => {
                  setScenarios((prev) => [
                    ...prev.filter(item => item.id !== scenario_id)
                  ]);
                }}
              />
            ))
          }
            {scenarios.length < 5 && 
              <div className="pt-4">
                  <Button
                    backgroundColor="white"
                    outlinedWidth={1}
                    textColor={theme.palette.primary.main}
                    outlinedColor={theme.palette.primary.main}
                    outlined
                    fullWidth
                    iconName="plus"
                    isIconRight
                    isCenter
                    className="rounded-[15px] min-w-10 max-w-40 py-2 mx-2 mb-4"
                    onClick={() => {
                      if (scenarios.length < 5)
                        setScenarios((prev) => 
                          [
                            ...prev, 
                            {
                              id: `scenario_${uuid4()}`,
                              description: "", 
                              related_media: []
                            }
                          ])
                        }
                    }
                >
                  {strings.brief_create_form.add_scenario_action}
                </Button>
              </div>
            }
          </div>
          
          <BriefCreateFormSubmit handleSubmit={handleSubmit} loading={isCreateBriefApiLoading} />
        </form>
      )}
    </Formik> 
		</div>
	);
};

export default BriefCreateForm;
