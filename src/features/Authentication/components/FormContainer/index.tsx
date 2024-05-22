import React from "react";
import classnames from "classnames";

export interface IFormContainerProps {
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
  children: React.ReactNode;
  className?: string;
}

const FormContainer: React.FC<IFormContainerProps> = ({
  header,
  footer,
  children,
  ...props
}) => {
  return (
    <div
      className={classnames(
        props.className,
        "flex flex-col justify-center space-y-3 p-0 xs:p-1 md:p-4"
      )}
    >
      {header && header()}
      {children}
      {footer && footer()}
    </div>
  );
};
export default FormContainer;
