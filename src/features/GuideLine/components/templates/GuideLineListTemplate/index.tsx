import { FC, memo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import GuideLineList from "../GuideLineList";
import { useGuideLinesQuery } from "src/features/GuideLine/api/hooks";
import { IGetListGuideLinesProps } from "src/features/GuideLine/types/GuideLineApiFunctionsTypes";
import { GuideLineText } from "../../GuideLineText";

interface IGuideLineListTemplateProps {
  filterRequireToggleFilters?: IGetListGuideLinesProps["page"];
}

const GuideLineListTemplate: FC<IGuideLineListTemplateProps> = () => {
  const wrapper = useRef<HTMLInputElement | null>(null);

  const {
    data: GuideLineData,
    isLoading: isLoadingGuideLineData,
    isFetching: isFetchingGuideLineData,
    error: errorGuideLineData,
  } = useGuideLinesQuery({});

  return (
    <div ref={wrapper}>
      <div
        className={
          "flex flex-wrap gap-8 mx-auto px-4 fablet:px-10 md:px-12 lg:px-16"
        }
      >
        <section
          className={
            "w-full xs:flex-grow fablet:flex-grow-[999] fablet:basis-0 pt-4"
          }
        >
          <GuideLineText
            isLoading={isLoadingGuideLineData || isFetchingGuideLineData}
            text={GuideLineData?.guideline_description}
          />
          {GuideLineData && !errorGuideLineData && (
            <GuideLineList
              GuideLinesData={GuideLineData}
              isLoadingGuideLineList={
                isLoadingGuideLineData || isFetchingGuideLineData
              }
              brief={false}
            />
          )}
          {errorGuideLineData && (
            <div className="dir-ltr">{"GuideLine list get error"}</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default memo(GuideLineListTemplate);
