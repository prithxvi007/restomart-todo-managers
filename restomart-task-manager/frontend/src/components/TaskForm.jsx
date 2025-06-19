import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, taskData = {} }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: ''
  });

  useEffect(() => {
    if (taskData._id) {
      setForm({
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || 'todo',
        dueDate: taskData.dueDate ? taskData.dueDate.slice(0, 10) : ''
      });
    }
  }, [taskData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title is required");
    onSubmit(form);
  };

  return (
    <form className="task-form-horizontal" onSubmit={handleSubmit}>
      <div>
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <input name="description" value={form.description} onChange={handleChange} />
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      </div>
      <div className="form-action">
        <button type="submit">💾 Save Task</button>
      </div>
    </form>
  );
};

export default TaskForm;
