import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaUndo, FaTrash } from "react-icons/fa";
import "./DeletedTasksPanel.css";

function DeletedTasksPanel({ deletedTasks, onRestore, onDelete }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    contentRef.current.style.maxHeight = open
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [open, deletedTasks]);

  // ✅ HOOK'LARDAN SONRA RETURN
  if (deletedTasks.length === 0) return null;

  return (
    <div className="deleted-panel">
      <button
        className="deleted-header"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Son Silinenler ({deletedTasks.length})</span>
        <FaChevronDown className={open ? "rotate" : ""} />
      </button>

      <div ref={contentRef} className="deleted-content">
        {deletedTasks.map((task) => (
          <div key={task.id} className="deleted-item">
            <div>
              <strong>{task.title}</strong>
              <small>
                {new Date(task.deletedAt).toLocaleString()}
              </small>
            </div>

            <div className="deleted-actions">
              <button onClick={() => onRestore(task)} title="Geri yükle">
                <FaUndo />
              </button>
              <button onClick={() => onDelete(task.id)} title="Kalıcı sil">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeletedTasksPanel;
