import { useState, useEffect } from "react";
import "./EditTaskModal.css";

function EditTaskModal({ isOpen, task, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(task.date);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSave({
      ...task,
      title,
      date,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Görevi Düzenle</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Görev başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              İptal
            </button>

            <button type="submit" className="save">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
