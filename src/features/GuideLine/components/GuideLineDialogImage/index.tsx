import React, { FC } from "react";
import { BriefImage } from "src/features/Brief/components/BriefImage";
import MyDialog from "src/core/components/CustomDialog";
import strings from "src/translations/translations";
import Button from "src/core/components/Button";

export interface IGuideLineDialogImagegProps {
  file?: string;
  open: boolean;
  onClose: () => void;
}

const GuideLineDialogImage: FC<IGuideLineDialogImagegProps> = ({
  file,
  open,
  onClose,
  ...props
}) => {
  return (
    <MyDialog open={open} onClose={onClose}>
      <Button variant="secondary" className="py-4">
        <a
          href={file}
          target="_blank"
        >
          {strings.download}
        </a>
      </Button>
      <BriefImage
        image={file ?? ""}
        name=""
        className="GuideLine-card-image-mobile"
        imageClassName="w-full h-full object-cover"
      />
    </MyDialog>
  );
};

export default GuideLineDialogImage;
