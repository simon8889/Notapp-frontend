import { useContext, useState } from "react";
import "./AddNote.css"
import useAuth from "@/hook/useAuth";
import { redirect } from "next/navigation";
import { addNote } from "@/api/notes";
import { NotesContext } from "@/contexts/notesContext";

const AddNote = () => {
  const { token } = useAuth()
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>([""]);
  const { notes, setNotes } = useContext(NotesContext) as NotesContextType

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredCategories = categories
      .filter((name) => name.trim() !== "")

    if (!content.trim() || filteredCategories.length === 0) {
      alert("Please add content and at least one category.");
      return;
    }

    const newNote: NoteBody = {
      content,
      categories: filteredCategories,
    };
    if (!token) redirect("/login");
    const result = await addNote(token, newNote)
    if (!result.ok) return 
    const data = await result.json()
    const noteAdded = data.note as Note
    setNotes([noteAdded, ...notes]);
    setContent("");
    setCategories([""]);
  };

  return (
    <form className="AddNote" onSubmit={handleSubmit}>
      <textarea
        className="AddNote__content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
      />
      <div className="AddNote__categories">
        <label>Categories:</label>
        {categories.map((category, index) => (
          <div key={index} className="AddNote__category">
            <input
              type="text"
              value={category}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
              placeholder="Category name"
            />
            <button
              type="button"
              className="AddNote__remove-category"
              onClick={() => handleRemoveCategory(index)}
            >
              ✖
            </button>
          </div>
        ))}
        <button
          type="button"
          className="AddNote__add-category"
          onClick={handleAddCategory}
        >
          + Add Category
        </button>
      </div>
      <button type="submit" className="AddNote__submit">Add Note</button>
    </form>
  );
};

export default AddNote;