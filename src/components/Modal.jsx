import React, { useRef, useState } from "react";

function Modal({ onClose, onCreateGroup, groups }) {
  const modalRef = useRef(null);
  const [color, setColor] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const closePopup = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleCreate = () => {
    const trimmedName = groupName.trim();

    if (trimmedName.length < 2) {
      setError("Group name must be at least 2 characters");
      return;
    }

    if (!color) {
      setError("Please select a color");
      return;
    }

    const exists = groups.some(
      (g) => g.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (exists) {
      setError("Group already exists");
      return;
    }

    onCreateGroup({
      id: Date.now(),
      name: trimmedName,
      color,
      notes: [],
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#808080",
  ];

  return (
    <div ref={modalRef} onClick={closePopup} className="pop-up">
      <div className="pop-up-margin">
        <h2>Create New Group</h2>

        <div className="form-row">
          <span className="label">Group Name</span>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="form-row">
          <span className="label">Select Colour</span>
          <div className="color-options">
            {colors.map((c) => (
              <span
                key={c}
                className={`color ${color === c ? "active" : ""}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="btn-row">
          <button onClick={handleCreate} className="create-btn">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
