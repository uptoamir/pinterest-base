import { useState } from "react";
import { useCreateBriefMutation } from "src/features/Brief/api/hooks";
import { PostCreateBriefRequest } from "src/features/Brief/types/BriefApiFunctionsTypes";

const useBriefCreate = () => {
	const [ scenarios, setScenarios ] = useState<Scenario[]>([]);
	const { mutate: postBriefCreate, isSuccess, isLoading: isCreateBriefApiLoading } = useCreateBriefMutation();

	return {
		onFormSubmit: (brief: PostCreateBriefRequest) => {
			postBriefCreate(brief);
		},
		scenarios,
		setScenarios,
		isSuccess,
		isCreateBriefApiLoading,
	};
};

export default useBriefCreate;
