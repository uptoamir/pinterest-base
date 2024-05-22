import { NextPage } from "next";
import React from "react";
import withPageHeader from "src/core/utils/HOC/withPageHeader";
import withAuth from "src/core/utils/HOC/withAuth";
import BriefInfoTemplate from "src/features/Brief/components/templates/Brief";

const BriefInfoPage: React.FC<NextPage> = () => {
  return <BriefInfoTemplate />;
};
export default withAuth(withPageHeader(BriefInfoPage as NextPage));
