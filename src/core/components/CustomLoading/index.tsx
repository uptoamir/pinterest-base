import { useTheme } from "@mui/material/styles";
import React, { FC } from "react";

const CustomLoading: FC = () => {
  const theme = useTheme();

  return (
    <div className="w-screen absolute h-full top-0 flex justify-center items-center rounded-lg text-white bg-inherit">
      <svg
        className="h-10 w-10 animate-spin"
        style={{ color: theme.palette.primary.main }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default CustomLoading;
