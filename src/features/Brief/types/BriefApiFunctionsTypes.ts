export type GetListBriefsRequest = {
	page?: number | null;
	page_size?: number | null;
};

export type GetBriefInfoRequest = {
	briefId: string | undefined;
};

export type PostCreateBriefRequest = {
	name: string;
	description?: string;
	scenarios: Scenario[];
};

export type PostCreateBriefResponse = {
	id: number;
	name: string;
	description: string;
	created_date: Date;
	modified_date: Date;
};

export type PostUploadImageRequest = {
	data: FormData;
	objectId: string;
	onUploadProgressChange: (progress: number | undefined) => void;
};

export type PostUploadImageResponse = SuccessResponse<FileObject>;

export type BriefsInfoResponse = Array<FileObject>;
