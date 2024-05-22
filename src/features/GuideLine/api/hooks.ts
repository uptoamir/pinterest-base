import { getListGuideLines } from ".";
import { IGetListGuideLinesProps } from "src/features/GuideLine/types/GuideLineApiFunctionsTypes";

import { IListGuideLines } from "src/features/GuideLine/types/GuideLineTypes";
import { useCustomQuery } from "src/core/api/useCustomQuery";

export const useGuideLinesQuery = (
  options: IGetListGuideLinesProps & { enabled?: boolean }
) => {
  const { enabled = true, ...restOption } = options;
  return useCustomQuery<
    Promise<IListGuideLines | undefined>,
    Error,
    IListGuideLines
  >(["GuideLines"], () => getListGuideLines(), {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
    enabled,
  });
};
