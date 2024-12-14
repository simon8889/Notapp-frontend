type AccessToken = {
	access_token: string
	token_type: string
	username: string
}

type Category = {
  note_id: number;
  name: string;
  id: number;
};

type Note = {
  updated_at: string; 
  created_at: string;
  content: string;
  id: number;
  is_archived: boolean;
  user_id: number;
  categories: Category[]; 
};

type ApiDeletedResponse = {
  deleted: boolean
}

type ApiUpdatedResponse = {
  updated: bool | Note
}

type NoteBody ={
  content: string;
  categories: string[];
}

interface NotesContextType {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;
}
