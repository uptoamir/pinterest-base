import { Dialog, DialogProps } from "@mui/material";
import React, { FC } from "react";
import HeaderDialog from "../HeaderDialog";

export interface IMyDialogProps extends DialogProps {
  title?: string;
  open: boolean;
  onClose: () => void;
}

const MyDialog: FC<IMyDialogProps> = ({ title, open, onClose, ...props }) => {
  const { children, maxWidth = "lg", ...restProps } = props;
  const lgWidth = maxWidth === "lg" && {
    maxWidth: "70%",
    width: "60%",
    minWidth: "50%",
  };
  const xlWidth = maxWidth === "xl" && {
    maxWidth: "80%",
    width: "70%",
    minWidth: "60%",
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...restProps}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: {
          borderRadius: 14,
          ...lgWidth,
          ...xlWidth,
        },
      }}
    >
      {title && (
        <HeaderDialog
          title={title}
          handleAction={onClose}
          iconNameAction={"close"}
          withDivider={true}
        />
      )}
      {children}
    </Dialog>
  );
};

export default MyDialog;
