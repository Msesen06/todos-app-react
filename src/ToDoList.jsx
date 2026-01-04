import React, { useState, useEffect, useMemo } from 'react'
import TodoCard from './TodoCard';
import AddTask from './AddTask';
import EditTaskModal from './EditTaskModal';
import ProgressBar from './ProgressBar';
import toast, { Toaster } from 'react-hot-toast';
import SearchInput from './SearchInput';
import "./TodoCard.css";
import DeletedTasksPanel from './DeletedTasksPanel';


export default function ToDoList() {

    const STORAGE_KEY = "todo_tasks";
    const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);

const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.completed).length;

    
 
 const [editingTask, setEditingTask] = useState(null);
 const [searchTerm, setSearchTerm] = useState("");
 const [deletedTasks, setDeletedTasks] = useState([]);

 const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);


const onDelete = (task) => {
  setTasks((prev) => prev.filter((t) => t.id !== task.id));

  setDeletedTasks((prev) => [
    { ...task, deletedAt: new Date().toISOString() },
    ...prev,
  ]);

  toast.error("Görev silindi");
};

//geri yükleme fonksiyonu
const restoreTask = (task) => {
  setDeletedTasks((prev) =>
    prev.filter((t) => t.id !== task.id)
  );

  setTasks((prev) => [...prev, task]);

  toast.success("Görev geri yüklendi");
};

//kalıcı silme fonksiyonu
const permanentlyDeleteTask = (id) => {
  setDeletedTasks((prev) =>
    prev.filter((task) => task.id !== id)
  );

  toast("Görev kalıcı olarak silindi", {
    icon: "🗑️",
  });
};



 const onToggle = (id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };
   const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditingTask(task);
  };

  const handleSaveEdit = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
    setEditingTask(null);
    toast.success("Görev güncellendi");
  };
        return (
    <div className='container'>
        <AddTask onAdd={handleAddTask} />
        <DeletedTasksPanel
          deletedTasks={deletedTasks}
          onRestore={restoreTask}
          onDelete={permanentlyDeleteTask}
        />
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <ProgressBar
            total={totalTasks}
            completed={completedTasks}
        />
         {(tasks.length > 0) && <h2>Yapılacak Görevler</h2> || <h2>Hiç görev yok, ekleyin!</h2>}
         <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      {filteredTasks.map((task) => (
        <TodoCard
          key={task.id}
          todo={task}
          onDelete={()=>onDelete(task, filteredTasks.indexOf(task))}
          onToggle={onToggle}
          onEdit={handleEdit}
        />
      ))}

      <EditTaskModal
        isOpen={!!editingTask}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEdit}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontWeight: "500",
          },
        }}
      />
    </div>

    </div>
  )
}
