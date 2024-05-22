import classnames from "classnames";
import React, { FC, useState } from "react";
import { IGuideLineCardProps } from "..";
import { useRouter } from "next/router";
import { BriefImage } from "src/features/Brief/components/BriefImage";
import MyDialog from "src/core/components/CustomDialog";
import strings from "src/translations/translations";
import GuideLineDialogImage from "../../GuideLineDialogImage";

const MainGuideLineCard: FC<IGuideLineCardProps> = ({
  GuideLine,
  footer,
  withFooter = false,
  changeRouteToGuideLineOff = true,
  ...props
}) => {
  const { file } = GuideLine;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={classnames(
        props.className ?? "my-1 rounded-8",
        "cursor-pointer primary-rounded-box bg-transparent transition-all duration-300",
        props?.isSummary ? "" : "",
        props?.shadowOff
          ? ""
          : "hover:border-transparent hover:bg-background-primary hover:shadow-md hover:shadow-primary"
      )}
    >
      <button
        className="flex flex-col justify-end items-stretch space-s-4 brief-card w-full"
        style={{ margin: 0, padding: 0 }}
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
      {props?.iconComponent && props?.iconComponent()}
    </div>
  );
};

export default MainGuideLineCard;
