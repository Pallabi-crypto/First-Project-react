import React, { useState } from 'react'
import { SendHorizontal } from 'lucide-react'

const Main = ({ groups, activeGroupId, setGroups }) => {
  const [text, setText] = useState("")
  const activeGroup = groups?.find(
    g => g.id === Number(activeGroupId));

  console.log("Groups state:", groups);
  console.log("Groups:", groups);
  console.log("ActiveGroupId:", activeGroupId);

  if (!activeGroup) {
    return (
      <div className='app-main-empty'>
        <h2>Pocket Notes</h2>
        <h4>Send and receive masseges without keeping your phone online.
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </h4>
      </div>
    )
  }

  {
    activeGroup.notes.map(note => (
      <div key={note.id}>
        {note.text}
      </div>
    ))
  }

  const saveNote = () => {
    console.log("saving notes", text)

    if (!text.trim()) return

    const now = new Date().toISOString()

    const newNote = {
      id: Date.now(),
      text,
      createdAt: now,
      updatedAt: now,
    }

    setGroups(prev =>
      prev.map(group =>
        group.id === Number(activeGroupId)
          ? { ...group, notes: [...(group.notes || []), newNote] }
          : group
      )
    )

    setText("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      saveNote()
    }
  }

  const formatDateTime = (value) => {
    if (!value) return ""

    const date = new Date(value)
    if (isNaN(date)) return ""

    return `${date.toLocaleDateString("en-IN")} • ${date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  return (
    <div className='app-main'>

      {/* HEADER */}
      <div className='app-main-header'>
        <div
          className='dot'
          style={{ backgroundColor: activeGroup.color }}
        >
          {activeGroup.name
            .split(" ")
            .filter(Boolean)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <span className='group-name'>{activeGroup.name}</span>
      </div>

      {/* NOTES */}
      <div className='note-list'>
        {(activeGroup.notes || []).map(note => (
          <div key={note.id} className='note'>
            <p>{note.text}</p>
            {note.updatedAt && (
              <span>{formatDateTime(note.updatedAt)}</span>
            )}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className='app-main-note-preview'>
        <textarea
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={saveNote}
          disabled={!text.trim()}
          className='send-btn'
        >
          <SendHorizontal size={18} />
        </button>
      </div>

    </div>
  )
}
export default Main
