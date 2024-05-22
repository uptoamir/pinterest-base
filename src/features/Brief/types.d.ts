type KeyChoiceField = {
	text: string;
	value: any;
}
type Scenario = {
	id?: string;
	description?: string;
	related_media: string[];
};

type Brief = {
	id: string | number;
	name: string;
	description: string | null;
	created_date: string;
	modified_date: string;
	status: KeyChoiceField;
	main_image: string;
	company: string | number;
};


type PaginatedList<T> = {
	count: number;
	next: string | null;
	current: number;
	num_pages: number;
	previous: string | null;
	results: T[];
}

type BriefList = PaginatedList<Brief>;

type FileObject = {
	id?: string | number;
	objectId?: string;
	file?: string;
	user?: any;
	created_date?: Date;
	modified_date?: Date;
	progress?: number;
	isUploading?: boolean;
	description?: string;
};
  