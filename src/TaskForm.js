import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
      completed: false,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", width: "200px", marginRight: "10px" }}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: "8px", width: "300px", height: "60px", verticalAlign: "top" }}
      ></textarea>
      <button type="submit" style={{ padding: "8px 16px", marginLeft: "10px" }}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;