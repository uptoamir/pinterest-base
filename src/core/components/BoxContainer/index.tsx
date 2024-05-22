import classnames from "classnames";
import React, { memo } from "react";

interface IFilterBoxContainerProps {
  className?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  titleIcon?: string;
}

const BoxContainer: React.FC<IFilterBoxContainerProps> = (props) => {
  const { className, content, children, title, titleIcon } = props;
  return (
    <div className={classnames("bg-background-primary", className)}>
      {(title || titleIcon) && (
        <div className="flex items-center">
          {title && <h6 className="font-bold">{title}</h6>}
          {/* TODO : replace icon after implementing fontIcon */}
          {titleIcon && <span>{titleIcon}</span>}
        </div>
      )}
      {content || children}
    </div>
  );
};

export default memo(BoxContainer);
