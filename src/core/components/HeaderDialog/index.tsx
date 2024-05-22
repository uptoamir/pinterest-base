import classnames from "classnames";
import React, { FC } from "react";
import Divider from "@mui/material/Divider";
import Icon from "../Icon";

interface IHeaderDialogProps {
  title: string;
  handleAction: () => void;
  iconNameAction: "close" | "arrow-right";
  withDivider?: boolean;
  isShadow?: boolean;
  className?: string;
}

const HeaderDialog: FC<IHeaderDialogProps> = ({
  title,
  withDivider,
  handleAction,
  iconNameAction = "close",
  isShadow,
  ...props
}) => {
  return (
    <React.Fragment>
      <div
        className={classnames(
          "relative",
          isShadow ? "shadow-primary" : "",
          props?.className ?? "my-4"
        )}
      >
        <div className="mx-auto px-3 text-center w-full text-16 text-title font-bold">
          <span className="min-h-4 inline-block">{title}</span>
          <button
            onClick={handleAction}
            className="absolute right-4 text-btntext-secondrytext"
          >
            <Icon icon={iconNameAction} size={20} />
          </button>
        </div>
      </div>
      {withDivider && <Divider />}
    </React.Fragment>
  );
};

export default HeaderDialog;
