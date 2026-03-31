import React, { useState } from 'react'
import Modal from '../components/Modal'

const Sidebar = ({groups, setGroups, activeGroupId, setActiveGroupId, getInitial}) => {
  const [showPopup, setShowPopup] = useState(false);
  
  
  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>Pocket Notes</h1>
      </div> 
      <div>
      <button className='button' onClick={() => setShowPopup(true)}>+</button>
      {showPopup && (<Modal groups= {groups} onClose= {() => setShowPopup(false)} onCreateGroup={(group)=>
        setGroups(prev =>[ ...prev, group])
      }/>
      )}
      </div>
      
    <div className='group-list'>
      {groups.map(group =>(
        <div  key={group.id} className='group'>
          <div 
              className={`app-sidebar-note ${
                group.id === activeGroupId ? "active" : ""
              }`}
              
              onClick={() =>{ 
                console.log("Clicked group:", group.id);
                setActiveGroupId(group.id)}}
          >
          <div
              className='dot'
              style={{ backgroundColor: group.color }}
          >
          {getInitial(group?.name || "")}
        </div>
        <span className='group-name'>{group.name}</span>
        </div>
        </div>
      ))}
      
    </div>
    </div>
   
  )
}

export default Sidebar
