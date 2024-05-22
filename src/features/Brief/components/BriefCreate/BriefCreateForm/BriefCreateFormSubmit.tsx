import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import Button, { BTN_HTML_TYPE } from "src/core/components/Button";
import strings from "src/translations/translations";

type BriefCreateFormSubmitProps = {
	handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
	loading: boolean;
};

const BriefCreateFormSubmit: FC<BriefCreateFormSubmitProps> = ({handleSubmit, loading}) => {
    const theme = useTheme();
	const router = useRouter();
    
	return (
		<div className="flex flex-row justify-center sm:justify-end w-full">
			<Button
                backgroundColor="white"
                outlinedWidth={1}
                textColor={theme.palette.primary.main}
                outlinedColor={theme.palette.primary.main}
                outlined
                fullWidth
				className="rounded-[15px] min-w-10 max-w-40 py-2 mx-2"
				onClick={() => {
					router.back();
				}}
				loading={loading}
				loadingColor={theme.palette.primary.main}
			>
				{strings.brief_create_form.cancel_action}
			</Button>
			<Button
				variant="primary"
				type={BTN_HTML_TYPE.SUBMIT}
				className="rounded-[15px] min-w-10 max-w-40 py-2 mx-2"
                fullWidth
				onClick={handleSubmit}
				loading={loading}
			>
				{strings.brief_create_form.submit_action}
			</Button>
		</div>
	);
};

export default BriefCreateFormSubmit;
