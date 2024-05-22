import { AxiosResponse } from "axios";
import API, { baseURL } from "src/core/api/axiosConfig";
import { query_generator } from "src/core/utils/queryGenerator";
import { prepareParamsApiFunction } from "../utils/functions/prepareParamsApiFunction";
import {
  BriefsInfoResponse,
  GetBriefInfoRequest,
  GetListBriefsRequest,
  PostCreateBriefRequest,
  PostCreateBriefResponse,
  PostUploadImageRequest,
  PostUploadImageResponse,
} from "src/features/Brief/types/BriefApiFunctionsTypes";

const api = API.getInstance();

export const getListBriefs = async ({
  ...optionParams
}: GetListBriefsRequest): Promise<AxiosResponse<BriefList, any>> => {
  const params = query_generator(prepareParamsApiFunction(optionParams));
  const path = `/briefs/${params}`;
  const url = baseURL + path;
  const name = "getListBriefs";
  const result = await api.GetMethod<BriefList>({
    name,
    url,
    withToken: true,
  });
  return result;
};

export const postCreateBrief = async (
  args: PostCreateBriefRequest
): Promise<AxiosResponse<PostCreateBriefResponse, any>> => {
  const path = `/briefs/create`;
  const url = baseURL + path;
  const name = "postCreateBrief";

  const result = await api.PostMethod<PostCreateBriefResponse>({
    name,
    url,
    data: args,
    withToken: true,
  });
  return result;
};

export const postUploadImage = async (
  args: PostUploadImageRequest
): Promise<AxiosResponse<PostUploadImageResponse, any>> => {
  const path = `/briefs/scenario/upload`;
  const url = baseURL + path;
  const data = args.data;
  const name = "postUploadImage";
  const result = await api.PostMethod<PostUploadImageResponse>({
    url,
    name,
    data,
    withToken: true,
    content_type: "multipart/form-data",
    onUploadProgressChange: args.onUploadProgressChange,
  });
  if (result.status === 201 && result?.data?.data)
    result.data.data.objectId = args.objectId;
  return result;
};

export const getListBriefInfo = async ({
  briefId,
}: GetBriefInfoRequest): Promise<AxiosResponse<BriefsInfoResponse, any>> => {
  const path = `/briefs/${briefId}/gallery`;
  const url = baseURL + path;
  const name = "getListBriefInfo";
  const result = await api.GetMethod<BriefsInfoResponse>({
    name,
    url,
    withToken: true,
  });
  return result;
};
