import React, { memo } from "react";
import {
  ISizeProps,
  SCREENS,
  useWindowSize,
} from "src/core/utils/customHooks/useWindowSize";
import { IListGuideLines } from "src/features/GuideLine/types/GuideLineTypes";
import { IGetListGuideLinesProps } from "src/features/GuideLine/types/GuideLineApiFunctionsTypes";
import GuideLineCard from "src/features/GuideLine/components/GuideLineCard";
import strings from "src/translations/translations";
import SkeletonGuideLine from "src/features/GuideLine/components/SkeletonGuideLine";

interface IGuideLineListProps {
  GuideLinesData: IListGuideLines;
  className?: string;
  removeSideBar?: boolean;
  isLoadingGuideLineList?: boolean;
  brief: boolean;
  setParamApi?: React.Dispatch<React.SetStateAction<IGetListGuideLinesProps>>;
}

const GuideLineList: React.FC<IGuideLineListProps> = ({
  GuideLinesData,
  setParamApi,
  brief,
  isLoadingGuideLineList,
}) => {
  const { width }: ISizeProps = useWindowSize();

  return (
    <React.Fragment>
      {isLoadingGuideLineList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 xl:grid-cols-4 gap-2 dir-ltr">
          {[1, 2, 3, 4].map((id) => (
            <SkeletonGuideLine key={id} />
          ))}
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 xl:grid-cols-4 gap-2 dir-ltr">
            {GuideLinesData?.visual_identity?.map((GuideLine, index) => (
              <React.Fragment key={index}>
                <GuideLineCard
                  GuideLine={GuideLine}
                  withFooter={true}
                  isMobile={width < SCREENS.SM}
                />
              </React.Fragment>
            ))}
          </div>
          {!GuideLinesData?.visual_identity?.length && (
            <div className="mt-10 min-h-268px text-center">
              {brief
                ? strings.brief.no_brief_info
                : strings.guideline.no_guideline}
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default memo(GuideLineList);
