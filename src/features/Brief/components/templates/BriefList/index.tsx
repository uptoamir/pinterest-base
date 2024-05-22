import React, { memo, useEffect, useRef, useState } from "react";
import {
  ISizeProps,
  SCREENS,
  useWindowSize,
} from "src/core/utils/customHooks/useWindowSize";
import { GetListBriefsRequest } from "src/features/Brief/types/BriefApiFunctionsTypes";
import Pagination from "src/core/components/Pagination";
import BriefCard from "src/features/Brief/components/BriefCard";
import BriefPageHeader from "../../BriefPageHeader";
import strings from "src/translations/translations";
import SkeletonBrief from "src/features/Brief/components/SkeletonBrief";

type IBriefListProps = {
  briefsData: BriefList;
  className?: string;
  removeSideBar?: boolean;
  isLoadingBriefList?: boolean;
  setParamApi: React.Dispatch<React.SetStateAction<GetListBriefsRequest>>;
};

const BriefList: React.FC<IBriefListProps> = ({
  briefsData,
  setParamApi,
  isLoadingBriefList,
  ...props
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { width }: ISizeProps = useWindowSize();

  const didMount = useRef(false);

  const handleSetParamsApi = () => {
    setParamApi((prv) => {
      return {
        ...prv,
        page: currentPage,
      };
    });
  };

  useEffect(() => {
    if (didMount.current) handleSetParamsApi();
    else didMount.current = true;
  }, [currentPage, setParamApi]);

  useEffect(() => {
    const { current } = briefsData;
    setCurrentPage(current);
  }, [briefsData]);

  return (
    <React.Fragment>
      <div>
        <BriefPageHeader className="hidden sm:block" />
        {isLoadingBriefList ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 xl:grid-cols-4 gap-2 dir-ltr">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <SkeletonBrief key={id} />
            ))}
          </div>
        ) : (
          <React.Fragment>
            <div className="grid grid-cols-1 sm:grid-cols-2 tb:grid-cols-3 xl:grid-cols-4 gap-2 dir-ltr">
              {briefsData?.results?.map((brief, index) => (
                <React.Fragment key={index}>
                  <BriefCard
                    brief={brief}
                    withFooter={true}
                    isMobile={width < SCREENS.SM}
                  />
                </React.Fragment>
              ))}
            </div>
            {!briefsData?.results?.length && (
              <div className="mt-10 min-h-268px text-center">
                {strings.brief.no_brief}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      {briefsData.num_pages > 1 && !isLoadingBriefList && (
        <div className="my-8 -mx-4 sm:mx-0">
          <Pagination
            className="mx-auto sm:mx-0 sm:ms-auto"
            currentPage={currentPage}
            count={briefsData.num_pages}
            onPageChange={(page) => setCurrentPage(page)}
            siblingCount={width < SCREENS.XS ? 0 : 1}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(BriefList);
