import Author from "./AuthorInterface";

export default interface NoteInterface {
  id: number;
  title: string;
  author: Author;
  content: string;
}
