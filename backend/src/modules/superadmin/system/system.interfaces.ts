
export interface IReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  date: Date;
  isPublished: boolean;
}
