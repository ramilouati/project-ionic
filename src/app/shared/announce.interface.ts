export class announce {
  aid?: string; // Optional field for document ID (if using Firestore)
  title: string;
  announceBody: string;
  category: string;
 likes: number;
  coverImage: string;
  otherImages?: string[]; // Optional array of additional images
 id_user: string; // ID of the user who created the announcement


}
