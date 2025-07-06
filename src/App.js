import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./TaskForm";
import './App.css';

function App() {
  const [username, setUsername] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <p>Hello, {username}!</p>

      <TaskForm onAddTask={handleAddTask} />

      <div style={{ marginTop: "30px" }}>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        <h3 style={{ marginTop: "20px" }}>
          {filter === "all"
            ? "All Tasks"
            : filter === "completed"
            ? "Completed Tasks"
            : "Pending Tasks"}
        </h3>

        {filteredTasks.length === 0 && <p>No tasks in this view.</p>}
        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed" : ""}
            >
              <span onClick={() => handleToggleComplete(task.id)} style={{ cursor: "pointer" }}>
                <strong>{task.title}</strong> - {task.description}
                <br />
                <small>Created at: {task.createdAt}</small>
              </span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  marginLeft: "10px",
                  background: "#e74c3c"
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;