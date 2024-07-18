import Author from "./AuthorInterface";

export default interface NoteInterface {
  id: number;
  title: string;
  author: Author;
  content: string;
}

export interface NoteInterfaceAuthorless {
  id: number;
  title: string;
  content: string;
}
