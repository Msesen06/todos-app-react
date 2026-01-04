import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import "./TodoCard.css";

function TodoCard({ todo, onDelete, onEdit, onToggle }) {

 
  return (
    <div className={`todo-card animate-in ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        <span className="todo-date">{todo.date}</span>
      </div>

      <div className="todo-actions">
        <button
          className="icon-btn done"
          onClick={() => onToggle(todo.id)}
          title="Tamamla"
        >
          {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
        </button>

        <button
          className="icon-btn edit"
          onClick={() => onEdit(todo.id)}
          title="Düzenle"
        >
          <FaEdit />
        </button>

        <button
          className="icon-btn delete"
          onClick={() => onDelete(todo.id)}
          title="Sil"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
