import React, { FC } from "react";
import MainGuideLineCard from "./MainGuideLineCard";
import MobileGuideLineCard from "./MobileGuideLineCard";

export interface IGuideLineCardProps {
  GuideLine: FileObject;
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
  changeRouteToGuideLineOff?: boolean;
}

interface IGuideLineWrapperProps
  extends Omit<IGuideLineCardProps, "handleAddGuideLineToCart"> {
  isMobile?: boolean;
}

const GuideLineCard: FC<IGuideLineWrapperProps> = ({
  isMobile = false,
  ...props
}) => {
  return (
    <React.Fragment>
      {isMobile ? (
        <MobileGuideLineCard {...props}>{props?.children}</MobileGuideLineCard>
      ) : (
        <MainGuideLineCard {...props}>{props?.children}</MainGuideLineCard>
      )}
    </React.Fragment>
  );
};

export default GuideLineCard;
