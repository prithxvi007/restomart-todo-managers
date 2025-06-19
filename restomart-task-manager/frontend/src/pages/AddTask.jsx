import React from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (task) => {
    try {
      const res = await fetch(`${API}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        navigate('/home');
      } else {
        const err = await res.text();
        console.error('❌ Create failed:', err);
      }
    } catch (error) {
      console.error('🚫 Submit error:', error);
    }
  };

  return (
    <div className="page">
      <h1 style={{ marginBottom: '1.5rem' }}>📝 Add Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddTask;
