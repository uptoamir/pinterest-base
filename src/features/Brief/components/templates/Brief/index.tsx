import { FC, memo, useRef } from "react";
import { useBriefInfoQuery } from "src/features/Brief/api/hooks";
import { useRouter } from "next/router";
import { IListGuideLines } from "src/features/GuideLine/types/GuideLineTypes";
import GuideLineList from "src/features/GuideLine/components/templates/GuideLineList";
import {
  BriefsInfoResponse,
  GetBriefInfoRequest,
} from "src/features/Brief/types/BriefApiFunctionsTypes";

const BriefInfoTemplate: FC<object> = ({ ...props }) => {
  const wrapper = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const {
    data: BriefData,
    isLoading: isLoadingBriefData,
    isFetching: isFetchingBriefData,
    error: errorBriefData,
  } = useBriefInfoQuery({ briefId: id?.toString() });

  const handleMapBriefInfoToGuidelinesList: (
    briefList: BriefsInfoResponse
  ) => IListGuideLines = (briefList) => {
    const briefToGuidelines: IListGuideLines = {
      id: "",
      name: "",
      guideline_description: "",
      visual_identity: [],
    };

    briefToGuidelines.visual_identity = briefList.map(
      (briefInfo: FileObject) => ({
        id: briefInfo.id,
        file: briefInfo.file,
        created_date: briefInfo.created_date,
        modified_date: briefInfo.modified_date,
        user: {
          id: briefInfo.user,
          full_name: "",
          avatar: "",
        },
      })
    );
    return briefToGuidelines;
  };

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
          {BriefData && !errorBriefData && (
            <GuideLineList
              GuideLinesData={handleMapBriefInfoToGuidelinesList(BriefData)}
              isLoadingGuideLineList={isLoadingBriefData || isFetchingBriefData}
              brief={true}
            />
          )}
          {errorBriefData && (
            <div className="dir-ltr">{"Brief info get error"}</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default memo(BriefInfoTemplate);
