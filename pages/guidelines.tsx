import { NextPage } from "next";
import React from "react";
import withPageHeader from "src/core/utils/HOC/withPageHeader";
import withAuth from "src/core/utils/HOC/withAuth";
import GuideLineListTemplate from "src/features/GuideLine/components/templates/GuideLineListTemplate";

const GuideLineListPage: React.FC<NextPage> = () => {
  return <GuideLineListTemplate />;
};
export default withAuth(withPageHeader(GuideLineListPage as NextPage));
