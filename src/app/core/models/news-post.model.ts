export interface NewsPost {
  id: string;
  title: string;
  author: string;
  publicationDate: string;
  imageUrl: string;
  summary: string;
  content: string;
  tags?: string[];
}