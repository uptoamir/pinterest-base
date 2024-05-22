import React, { FC } from "react";
import MainBriefCard from "./MainBriefCard";
import MobileBriefCard from "./MobileBriefCard";

export interface IBriefCardProps {
  brief: Brief;
  footer?: () => JSX.Element;
  className?: string;
  withFooter?: boolean;
  footerAction?: () => void;
  iconComponent?: () => JSX.Element;
  iconAction?: () => void;
  isSummary?: boolean;
  children?: React.ReactNode;
  shadowOff?: boolean;
  isLoading?: boolean;
  hideDiscount?: boolean;
  changeRouteToBriefOff?: boolean;
}

interface IBriefWrapperProps
  extends Omit<IBriefCardProps, "handleAddBriefToCart"> {
  isMobile?: boolean;
}

const BriefCard: FC<IBriefWrapperProps> = ({
  isMobile = false,
  ...props
}) => {
  return (
    <React.Fragment>
      {isMobile ? (
        <MobileBriefCard {...props}>{props?.children}</MobileBriefCard>
      ) : (
        <MainBriefCard {...props}>{props?.children}</MainBriefCard>
      )}
    </React.Fragment>
  );
};

export default BriefCard;
