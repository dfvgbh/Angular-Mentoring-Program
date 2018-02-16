export interface Course {
  id: number;
  name: string;
  addedDate: Date;
  duration: number;
  description: string;
  isTopRated: boolean;
  authors: string[];
}
