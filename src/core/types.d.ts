/* eslint-disable no-unused-vars */
type SuccessResponse<T> = {
	data: T;
	status: {
		message: string;
		code: number;
	};
};
