import classnames from "classnames";
import React, { FC } from "react";
import Button from "src/core/components/Button";
import strings from "src/translations/translations";

interface IBriefOptionHandlerMobileProps {
  addAction: () => void;
  className?: string;
}
const BriefOptionHandlerMobile: FC<IBriefOptionHandlerMobileProps> = ({
  addAction,
  ...props
}) => {
  return (
    <div
      className={classnames(
        "w-full flex items-center space-s-4 justify-between shadow-up",
        props?.className
      )}
    >
      <Button
        variant="secondary"
        className="font-bold text-14 px-8 py-4"
        small={true}
        iconName="bank-card-line"
        iconClassName="text-primary-base mx-2"
        isIconRight={true}
        fullWidth={true}
        onClick={() => addAction()}
      >
        {strings.brief.create_new}
      </Button>
    </div>
  );
};

export default BriefOptionHandlerMobile;
