import { getListBriefInfo, getListBriefs, postCreateBrief, postUploadImage } from ".";
import {
	GetListBriefsRequest,
	GetBriefInfoRequest,
	PostCreateBriefRequest,
	PostCreateBriefResponse,
	PostUploadImageRequest,
	PostUploadImageResponse,
	BriefsInfoResponse,
} from "src/features/Brief/types/BriefApiFunctionsTypes";

import { useCustomQuery } from "src/core/api/useCustomQuery";
import { useCustomMutation } from "src/core/api/useCustomMutation";
import { AxiosResponse } from "axios";
import { UseMutationOptions } from "@tanstack/react-query";

export const useBriefsQuery = (options: GetListBriefsRequest & { enabled?: boolean }) => {
	const { enabled = true, ...restOption } = options;
	return useCustomQuery<Promise<BriefList | undefined>, Error, BriefList>(
		[ "briefs" ],
		() => getListBriefs(restOption),
		{
			refetchOnWindowFocus: false,
			refetchIntervalInBackground: false,
			refetchInterval: false,
			enabled,
		},
	);
};

export const useCreateBriefMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<PostCreateBriefResponse>, Error, PostCreateBriefRequest, any>,
		"mutationFn"
	>,
) => {
	return useCustomMutation<
		AxiosResponse<PostCreateBriefResponse>,
		Error,
		PostCreateBriefRequest,
		any
	>(postCreateBrief, {
		...options,
	});
};

export const useUploadImageMutation = (
	options?: Omit<
		UseMutationOptions<AxiosResponse<PostUploadImageResponse>, Error, PostUploadImageRequest, any>,
		"mutationFn"
	>,
) => {
	return useCustomMutation<
		AxiosResponse<PostUploadImageResponse>,
		Error,
		PostUploadImageRequest,
		any
	>(postUploadImage, {
		...options,
	});
};


export const useBriefInfoQuery = (
	options: GetBriefInfoRequest & { enabled?: boolean }
  ) => {
	const { enabled = true, briefId } = options;
	return useCustomQuery<
		Promise<BriefsInfoResponse | undefined>,
		Error,
		BriefsInfoResponse
	>(["brief", briefId], () => getListBriefInfo({ briefId }), {
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
		refetchInterval: false,
		enabled,
	});
}