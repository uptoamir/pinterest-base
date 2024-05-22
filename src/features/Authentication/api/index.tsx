import { AxiosResponse } from "axios";
import API, { baseURL } from "src/core/api/axiosConfig";
import {
  PostLoginRequest,
  loginResponseProps,
} from "src/features/Authentication/types/AuthApiTypes";

const api = API.getInstance();

export const postLoginAPI = async (
  args: PostLoginRequest
): Promise<AxiosResponse<loginResponseProps, any>> => {
  const path = `/users/auth/login`;
  const url = baseURL + path;
  const data = args.data;
  const name = "PostOtp";
  return api.PostMethod<loginResponseProps>({ url, name, data });
};
