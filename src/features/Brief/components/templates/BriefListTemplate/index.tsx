import { FC, memo, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GetListBriefsRequest } from "src/features/Brief/types/BriefApiFunctionsTypes";
import BriefList from "../BriefList";
import { useBriefsQuery } from "src/features/Brief/api/hooks";
import BriefOptionHandlerMobile from "../../BriefOptionHandlerMobile";
import { useRouter } from "next/router";
import { CREATE_BRIEF } from "src/core/routes";

interface IBriefListTemplateProps {
  filterRequireToggleFilters?: GetListBriefsRequest["page"];
}

const BriefListTemplate: FC<IBriefListTemplateProps> = ({
  filterRequireToggleFilters,
  ...props
}) => {
  const wrapper = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [paramApi, setParamApi] = useState<GetListBriefsRequest>({
    page: 1,
  });

  const {
    data: briefData,
    isLoading: isLoadingBriefData,
    isFetching: isFetchingBriefData,
    error: errorBriefData,
    refetch: refetchBriefData,
  } = useBriefsQuery(paramApi);

  const didMount = useRef(false);

  const scrolLWithUseRef = () => {
    wrapper.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  const handleRefetchQuery = () => {
    queryClient.cancelQueries({ queryKey: ["briefs"] });
    scrolLWithUseRef();
    refetchBriefData();
  };

  useEffect(() => {
    if (didMount.current) handleRefetchQuery();
    else didMount.current = true;
  }, [paramApi]);

  return (
    <div ref={wrapper} className="flex flex-1 flex-col">
      <div
        className={
          "flex flex-wrap flex-1 gap-8 px-4 fablet:px-10 md:px-12 lg:px-16"
        }
      >
        <section
          className={
            "w-full flex flex-1 justify-between flex-col xs:flex-grow fablet:flex-grow-[999] fablet:basis-0"
          }
        >
          {briefData && !errorBriefData && (
            <BriefList
              briefsData={briefData}
              setParamApi={setParamApi}
              isLoadingBriefList={isLoadingBriefData || isFetchingBriefData}
            />
          )}
          {errorBriefData && (
            <div className="dir-ltr">{"brief list get error"}</div>
          )}
        </section>
      </div>
      <BriefOptionHandlerMobile
        addAction={() => router.push(CREATE_BRIEF)}
        className="fixed bottom-0 bg-background-primary flex sm:hidden"
      />
    </div>
  );
};

export default memo(BriefListTemplate);
