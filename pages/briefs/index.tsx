import { NextPage } from "next";
import React from "react";
import withPageHeader from "src/core/utils/HOC/withPageHeader";
import withAuth from "src/core/utils/HOC/withAuth";
import BriefListTemplate from "src/features/Brief/components/templates/BriefListTemplate";

const BriefListPage: React.FC<NextPage> = () => {
  return <BriefListTemplate />;
};
export default withAuth(withPageHeader(BriefListPage as NextPage));
