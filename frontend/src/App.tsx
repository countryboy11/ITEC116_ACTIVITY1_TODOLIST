import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, Task } from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;
    await createTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleToggle = async (task: Task) => {
    await updateTask(task._id!, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">📝 To-Do List</h1>

      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md mb-6">
        <input
          className="w-full p-2 mb-2 text-black rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 text-black rounded"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full"
        >
          Add Task
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
          >
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggle(task)}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              >
                ✓
              </button>
              <button
                onClick={() => handleDelete(task._id!)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
