import classnames from "classnames";
import React, { FC, useState } from "react";
import { IGuideLineCardProps } from "..";
import { Backdrop, CircularProgress } from "@mui/material";
import { BriefImage } from "src/features/Brief/components/BriefImage";
import GuideLineDialogImage from "../../GuideLineDialogImage";

const MobileGuideLineCard: FC<IGuideLineCardProps> = ({
  GuideLine,
  footer,
  withFooter = false,
  isLoading = false,
  changeRouteToGuideLineOff = true,
  ...props
}) => {
  const { file } = GuideLine;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={classnames(
        props.className,
        "flex flex-col justify-around py-2 my-1 cursor-pointer bg-transparent relative"
      )}
    >
      {isLoading && (
        <Backdrop
          sx={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          open={true}
        >
          <CircularProgress color="secondary" size={25} />
        </Backdrop>
      )}
      <button
        className="flex flex-col justify-end items-stretch space-s-4 brief-card"
        onClick={() => setOpen(true)}
      >
        <BriefImage
          image={file ?? ""}
          name=""
          className="GuideLine-card-image-mobile"
          imageClassName="w-full h-full object-cover"
        />
      </button>
      <GuideLineDialogImage
        file={file}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default MobileGuideLineCard;
