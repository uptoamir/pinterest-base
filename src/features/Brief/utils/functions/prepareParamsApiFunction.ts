import { clean } from "src/core/utils/queryGenerator";
import { GetListBriefsRequest } from "src/features/Brief/types/BriefApiFunctionsTypes";

export const prepareParamsApiFunction = ({
  ...params
}: GetListBriefsRequest): any => {
  const result = clean(params);
  return result;
};
