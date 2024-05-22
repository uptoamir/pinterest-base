import { NextPage } from "next";
import React from "react";
import withAuth from "src/core/utils/HOC/withAuth";
import BriefCreateTemplate from "src/features/Brief/components/templates/BriefCreateTemplate";

const BriefCreatePage: React.FC<NextPage> = () => {
	return <BriefCreateTemplate />;
};

export default withAuth(BriefCreatePage as NextPage);
