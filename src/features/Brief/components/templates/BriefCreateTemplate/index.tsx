import { Typography } from "@mui/material";
import React, { FC } from "react";
import strings from "src/translations/translations";
import BriefCreateForm from "../../BriefCreate/BriefCreateForm";

type BriefCreateTemplateProps = object;

const BriefCreateTemplate: FC<BriefCreateTemplateProps> = (props) => {
	return (
		<div className="flex flex-col items-center min-h-screen p-4 w-screen">
			<Typography variant="h1">{strings.brief.create_new}</Typography>
			<BriefCreateForm />
		</div>
	);
};

export default BriefCreateTemplate;
