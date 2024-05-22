import React, { memo } from "react";
import classnames from "classnames";
import Typography from "@mui/material/Typography";

export interface ICenteredHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

const CenteredHeader: React.FC<ICenteredHeaderProps> = ({
  title,
  subtitle,
  ...props
}) => {
  return (
    <div
      className={classnames(
        "flex flex-col mb-3 space-y-2 items-center",
        props?.className
      )}
    >
      <Typography
        variant="h1"
        className="font-black"
        sx={{
          fontSize: { xs: "28px", sm: "28px" },
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h2"
        className="text-16 font-normal pt-4"
        sx={{
          fontSize: { xs: "18px", sm: "18px" },
          fontWeight: "300",
        }}
      >
        {subtitle}
      </Typography>
    </div>
  );
};

export default CenteredHeader;
