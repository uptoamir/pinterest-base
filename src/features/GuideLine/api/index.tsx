import { AxiosResponse } from "axios";
import API, { baseURL } from "src/core/api/axiosConfig";
import { query_generator } from "src/core/utils/queryGenerator";
import { IListGuideLines } from "src/features/GuideLine/types/GuideLineTypes";
import { IGetListGuideLinesProps } from "src/features/GuideLine/types/GuideLineApiFunctionsTypes";

const api = API.getInstance();

export const getListGuideLines = async (): Promise<
  AxiosResponse<IListGuideLines, any>
> => {
  const path = `/users/company/info`;
  const url = baseURL + path;
  const name = "getListGuideLines";
  const result = await api.GetMethod<IListGuideLines>({
    name,
    url,
    withToken: true,
  });
  return result;
};
