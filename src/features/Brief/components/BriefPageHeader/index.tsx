import classnames from "classnames";
import React, { FC } from "react";
import BoxContainer from "src/core/components/BoxContainer";
import Button from "src/core/components/Button";
import strings from "src/translations/translations";
import { useRouter } from "next/router";
import { CREATE_BRIEF } from "src/core/routes";

export interface IBriefPageHeaderProps {
  className?: string;
}
const BriefPageHeader: FC<IBriefPageHeaderProps> = ({ ...props }) => {
  const router = useRouter();

  return (
    <BoxContainer className={classnames("my-4 pt-4", props?.className)}>
      <div className="flex justify-between text-14 font-normal items-center dir-ltr">
        <div className="flex justify-start items-center z-0 space-s-3">
          <div className="text-btntext-secondrytext font-bold">
            <Button
              variant="primary"
              className="flex-1 rounded-[15px] px-4 py-2"
              onClick={() => {
                router.push(CREATE_BRIEF);
              }}
            >
              {strings.brief.create_new}
            </Button>
          </div>
        </div>
      </div>
    </BoxContainer>
  );
};

export default BriefPageHeader;
