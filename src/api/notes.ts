const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE;

export const getNotes = async (token: string): Promise<Response> => {
  const response = await fetch(`${API_ROUTE}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}

export const addNote = async (token: string, note: NoteBody): Promise<Response> => {
  const response = await fetch(`${API_ROUTE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(note)
  });
  return response;
}

export const updateNoteContent = async (token: string, noteId: number, content: string): Promise<Response> => {
  const newContent = {
    content: content
  }
  const response = await fetch(`${API_ROUTE}/notes/?note_id=${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(newContent)
  });
  return response;
}

export const changeNoteArchivedStatus = async (token: string, noteId: number): Promise<Response> => {
  const response = await fetch(`${API_ROUTE}/notes/archived/?note_id=${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}

export const deleteNote = async (token: string, noteId: number) => {
  const response = await fetch(`${API_ROUTE}/notes/?note_id=${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}

export const getCategories = async (token: string, noteId: number): Promise<Response> => {
  const response = await fetch(`${API_ROUTE}/notes/categories?note_id=${noteId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}

export const addCategory = async (token: string, noteId: number, name: string): Promise<Response> => {
  const response = await fetch(`${API_ROUTE}/notes/categories?note_id=${noteId}&name=${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}

export const deleteCategory = async (token: string, categoryId: number) => {
  const response = await fetch(`${API_ROUTE}/notes/categories?category_id=${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response;
}
