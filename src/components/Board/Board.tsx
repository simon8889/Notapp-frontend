import { getNotes } from "@/api/notes"
import useAuth from "@/hook/useAuth"
import { redirect } from "next/navigation"
import {useEffect, useState } from "react"
import Note from "../Note/Note"
import "./Board.css"
import AddNote from "../AddNote/AddNote"
import { NotesContext } from "@/contexts/notesContext"

const Board = () => {
  const { token } = useAuth()
  const [notes, setNotes] = useState<Note[]>([]);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [tagToFilter, setTagToFilter] = useState<string>("")

  const fetchNotes = async () => {
    if (!token) {
      redirect("/login");
    }
    const response = await getNotes(token);
    if (!response.ok) return
    const data = await response.json()
    const notesToSet = (data.notes as Note[]).reverse()
    setNotes(notesToSet)
  }

  useEffect(() => {
    fetchNotes();
  }, [token]);
  
  return (
    <NotesContext.Provider value={{notes, setNotes}}>
      <section className="Board">
        <div className="Board__header">
          <div className="Board__title">
            <h2>Your {showArchived && "Archived"} Notes:</h2>
            <button onClick={() => setShowArchived(!showArchived)}>{showArchived ? "Hide Archived" : "Show Archived"}</button>
          </div>
          <div className="Board__filter">
            <span>Filter by</span>
            <input 
              type="text" 
              placeholder="Tag" 
              value={tagToFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagToFilter(e.target.value)}
            />
          </div>
        </div>
        <AddNote />
        {notes ?
          notes
            .filter(note => showArchived ? note.is_archived : !note.is_archived)
            .filter(note =>
              tagToFilter.length === 0 || note.categories.some(category => category.name === tagToFilter) 
            )
            .map((note: Note) => <Note key={note.id} refreshNotes={fetchNotes} note={note} />)
          :
          <h4>Oops! Looks like your notes went on vacation 🏖️.</h4>
        }
      </section>
    </NotesContext.Provider>
  )
}

export default Board