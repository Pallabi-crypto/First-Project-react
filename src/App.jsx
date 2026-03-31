import Sidebar from './sideBar/sidebar'
import Main from './main/main'
import './App.css'
import { useState, useEffect } from 'react'

function App() {

  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeGroupId, setActiveGroupId] = useState(null);

  const activeGroup = groups.find(g => g.id === activeGroupId);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  // ✅ Fix old data
  useEffect(() => {
    setGroups(prev =>
      prev.map(group => ({
        ...group,
        notes: (group.notes || []).map(note => ({
          ...note,
          createdAt: note.createdAt || new Date().toISOString(),
          updatedAt: note.updatedAt || note.createdAt || new Date().toISOString(),
        })),
      }))
    );
  }, []);

  const getInitial = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  };

  return (
    <div className='app'>
      <Sidebar
        groups={groups}
        setGroups={setGroups}
        activeGroupId={activeGroupId}
        setActiveGroupId={setActiveGroupId}
        getInitial={getInitial}
      />

      <Main
        activeGroup={activeGroup}
        activeGroupId={activeGroupId}   // ✅ ADD THIS
        setGroups={setGroups}
        groups={groups}
      />
    </div>
  )
}

export default App;