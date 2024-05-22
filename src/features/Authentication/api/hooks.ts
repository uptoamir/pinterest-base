import { AxiosResponse } from "axios";
import { useCustomMutation } from "src/core/api/useCustomMutation";
import { UseMutationOptions } from "@tanstack/react-query";
import { postLoginAPI } from ".";
import { PostLoginRequest, loginResponseProps } from "../types/AuthApiTypes";

export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<loginResponseProps>,
      Error,
      PostLoginRequest,
      any
    >,
    "mutationFn"
  >
) =>
  useCustomMutation<
    AxiosResponse<loginResponseProps>,
    Error,
    PostLoginRequest,
    any
  >(postLoginAPI, {
    ...options,
  });
