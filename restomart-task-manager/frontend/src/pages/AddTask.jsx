import React from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const handleSubmit = async (task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) navigate('/home');
      else console.error('Create failed:', await res.text());
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="page">
      <h1>Add Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTask;