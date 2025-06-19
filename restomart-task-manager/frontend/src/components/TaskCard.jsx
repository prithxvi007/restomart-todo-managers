import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => (
  <div className="task-card-horizontal">
    <div className="task-info">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <p>Status: <strong>{task.status}</strong></p>
      {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
    </div>
    <div className="task-actions">
      <button onClick={onEdit}>✏️ Edit</button>
      <button onClick={onDelete}>🗑️ Delete</button>
    </div>
  </div>
);

export default TaskCard;