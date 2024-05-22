import classnames from "classnames";
import React from "react";

export interface IBadgeProps {
  label: number | string | undefined;
  isActive?: boolean;
  isDiscount?: boolean;
  customClass?: boolean;
  className?: string;
}

const Badge: React.FC<IBadgeProps> = ({
  label,
  className,
  isActive,
  isDiscount,
  customClass = false,
}) => {
  return (
    <span
      className={classnames(
        "flex items-center justify-center h-6 w-max rounded-40 px-2 text-white text-12 font-semibold min-w-4",
        className,
        !customClass
          ? isActive || isDiscount
            ? "bg-alert-negative"
            : "bg-borders-primary"
          : ""
      )}
    >
      {label}
      {isDiscount ? "%" : ""}
    </span>
  );
};

export default Badge;
