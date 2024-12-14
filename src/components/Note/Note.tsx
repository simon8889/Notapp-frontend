import { useEffect, useRef, useState } from "react";
import Category from "../Category/Category";
import { IoIosClose } from "react-icons/io";
import { addCategory, changeNoteArchivedStatus, deleteNote, getCategories, updateNoteContent } from "@/api/notes";
import useAuth from "@/hook/useAuth";
import { redirect } from "next/navigation";
import { FaCirclePlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import { FaRegStopCircle } from "react-icons/fa";
import "./Note.css";

const Note = ({ note, refreshNotes }: { note: Note, refreshNotes: () => void }) => {
  const { token } = useAuth()
  const [categories, setCategories] = useState<Category[]>(note.categories);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newContent, setNewContent] = useState<string>(note.content);
  const [editing, setEditing] = useState<boolean>(false);
  const contentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if (contentInputRef && editing){
        contentInputRef.current?.focus()
      }
      setNewContent(note.content)
    }   
  , [editing, note.content])
  
  const updateCategories = async () => {
    if (!token) {
      redirect("/login")
    }
    const result = await getCategories(token, note.id)
    if (!result.ok) return 
    const data = await result.json()
    setCategories(data.categories as Category[])
    await refreshNotes()
  }
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };
  
  const handleAddCategory = async () => {
    if (!token) redirect("/login")
    if (newCategoryName.length === 0) return 
    const result = await addCategory(token, note.id, newCategoryName)
    if (!result.ok) return
    await updateCategories();
    setNewCategoryName("")
  }
  
  const handleNoteDelete = async () => {
    if (!token) redirect("/login")
    const result = await deleteNote(token, note.id)
    if (!result.ok) return
    const data = await result.json() as ApiDeletedResponse
    if (!data.deleted) return 
    refreshNotes()
  }
  
  const handleNoteChangedStatus = async () => {
    if (!token) redirect("/login")
    const result = await changeNoteArchivedStatus(token, note.id)
    if (!result.ok) return
    const data = await result.json() as ApiUpdatedResponse
    if (!data.updated) return 
    refreshNotes()
  }
  
  const handleContentUpdate = async () => {
    if (!token) redirect("/login")
    const result = await updateNoteContent(token, note.id, newContent)
    if (!result.ok) return
    const data = await result.json() as ApiUpdatedResponse
    if (!data.updated) return 
    refreshNotes()
    setEditing(false)
  }

  return (
    <div className="Note__container">
      <div className="Note__buttons">
        {editing ? <FaRegStopCircle  onClick={() => setEditing(false)}/> : <CiEdit onClick={() => setEditing(true)} />}
        {note.is_archived ? <BiSolidArchiveOut onClick={handleNoteChangedStatus}/> : <BiSolidArchiveIn onClick={handleNoteChangedStatus}/>}
        <IoIosClose onClick={handleNoteDelete}/>
      </div>
      {editing ?
        <div className="Note__editing">
          <input type="textbox" 
            ref={contentInputRef}
            value={newContent} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewContent(e.target.value)}
          />
          <button onClick={handleContentUpdate}>Update!</button>
        </div>
      :
        <p className="Note__contentText">{note.content}</p>
      }
      <p className="Note__date"><strong>{note.updated_at !== note.created_at ?"Updated at" : "Created at"}:</strong> 
        {new Date(note.updated_at).toLocaleString()}
      </p>
      <h3 className="Note__categoriesTitle">Tags:</h3>
      <ul className="Note__categoriesList">
        {categories.map((category) => (
          <li key={category.id} className="Note__category">
            <Category category={category} refresh={updateCategories}/>
          </li>
        ))}
        <li className="Note__addCategory">
          <input 
            type="text" 
            value={newCategoryName} 
            onChange={handleInputChange} 
            placeholder="New tag"
          />
          <FaCirclePlus onClick={handleAddCategory}/>
        </li>
      </ul>
    </div>
  );
};

export default Note;