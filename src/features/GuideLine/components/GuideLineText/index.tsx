import { Typography } from "@mui/material";
import classnames from "classnames";
import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface IGuideLineTextProps {
  text: string | undefined;
  isLoading: boolean;
  className?: string;
}

export const GuideLineText: FC<IGuideLineTextProps> = ({
  text,
  isLoading,
  className,
  ...props
}) => {
  return (
    <div
      className={classnames(
        className ? className : "text-left relative pt-2 pb-6"
      )}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Skeleton
            sx={{ bgcolor: "grey.400", borderRadius: ".5rem" }}
            variant="rectangular"
            width="100%"
            height={100}
          />
        </Box>
      ) : (
        <Typography
          color="text.black"
          sx={{ fontWeight: 400, direction: "ltr" }}
          variant="h1"
          className="px-2 py-1"
        >
          {text}
        </Typography>
      )}
    </div>
  );
};
