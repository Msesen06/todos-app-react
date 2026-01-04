import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./AddTask.css";

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    if(date < new Date().toISOString().split("T")[0]) {
      alert("Geçmiş tarihli görev eklenemez!");
      return;
    }

    onAdd({
      id: Date.now(),
      title,
      date,
      completed: false,
    });

    setTitle("");
    setDate("");
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni görev ekle..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button disabled={!title.trim() || !date} type="submit" className="add-btn">
        <FaPlus />
      </button>
    </form>
  );
}

export default AddTask;
