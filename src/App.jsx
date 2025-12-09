import { useState , useEffect} from 'react'
import './App.css'

function App() {
const [task, setTask] = useState("");
const [tasks, setTasks] = useState([]);
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) {
    setTasks(saved);
  }
}, []);

const handleAddTask = () => {
  const trimmed = task.trim()
  if (trimmed === "") {
    setTask("");
    return;
  }
  setTasks(prev => [
    ...prev, 
    { text : trimmed , done: false}
  ]);
    setTask("");
};

const handleDeleteTask = (taskToDelete) => {
  setTasks(tasks.filter((_, index) => index !== taskToDelete));
};

const handleDeleteAll = () => {
  setTasks([]);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleAddTask();
  }
};

const handleToggleDone = (indexToToggle) => {
  setTasks(prev =>
    prev.map((task, index) =>
      index === indexToToggle ? { ...task, done: !task.done } : task
    )
  );
};

  return (
    <div className='main-h-screen bg-slate-900 text-slate-100 flex items-center justify-center'>
      <div className='w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-6'>
      <h1 className='text-2xl font-semibold text-center mb-5'>MY To-Do App</h1>
      <input 
        type="text"
         placeholder="Add a new task"
          value={task}
           onChange={(e) => setTask(e.target.value)}
           onKeyDown={handleKeyDown}
           className='flex-1 px-3 py-2 rounded-mb border border-slate-600 bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
      <button 
      onClick={handleAddTask}
      className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-mb text-sm font-medium'
      >Add Task</button>

      <div>
    {tasks.length === 0 && (
        <p className='text-xs text-slate-400 text-center'>No tasks added yet. Add your first one</p>
      )}
      
      <ul className='space-y-2'>
      {tasks.map((t , index) => (
        <li key={index}
          className='flex items-center justify-between bg-slate-900 rounded-md px-3 py-2 text-sm'
        > <span
        className={"flex-1 " + (t.done ? "linee-through text-slate-500" : "text-slate-100")}>{t.text}</span>

        <div className='flex items-center gap-2'>
          <button 
          onClick={() => handleToggleDone(index)}
          className='text-xs text-emerald-400 hover:text-emerald-300'
          >
            {t.done ? "Undo" : "Done"}
          </button>
          <button 
        onClick={() => handleDeleteTask(index)}
        className='text-xs text-red-400 hover:text-red-300'
        >Delete</button>
        </div>
        </li>
      ))}
      </ul>
      </div>

      {tasks.length !== 0 && (
      <button 
      onClick={handleDeleteAll}
      className='mt-4 w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-mb text-sm font-medium'
      >Delete All</button> 
      )}
      </div>
      </div>
        
        )
    
      };
export default App
