
export interface IPaginatedList<T> {
  id: string | number;
  name: string;
  guideline_description: string;
  visual_identity: T[];
}

export type IListGuideLines = IPaginatedList<FileObject>;
