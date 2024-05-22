import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";

export type PageHeaderProps = {
  title?: string;
  renderMain?: () => React.ReactNode;
  renderSide?: () => React.ReactNode;
};

const PageHeader: FC<PageHeaderProps> = ({ title, renderMain, renderSide }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
      }}
      className="flex flex-row justify-center items-center px-7 py-4 border-b border-[#EAEDF3] top-0 w-full fixed z-50"
    >
      <div className="flex flex-row items-end">
        {renderMain ? (
          renderMain()
        ) : (
          <Typography color="textPrimary" variant="h1" className="px-2">
            {title}
          </Typography>
        )}
      </div>
      <div style={{ marginLeft: "auto" }}>{renderSide && renderSide()}</div>
    </div>
  );
};

export default PageHeader;
