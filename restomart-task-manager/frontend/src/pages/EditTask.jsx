import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { useParams, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('Invalid task ID:', id);
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        const res = await fetch(`${API}/api/tasks/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTaskData(data);
        } else {
          console.error('Task not found');
        }
      } catch (err) {
        console.error('Fetch error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (task) => {
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        navigate('/home');
      } else {
        console.error('Update failed:', await res.text());
      }
    } catch (err) {
      console.error('Update request failed:', err);
    }
  };

  return (
    <div className="page">
      <h1 style={{ marginBottom: '1.5rem' }}>🛠️ Edit Task</h1>
      {loading ? (
        <p className="loading-message" style={{ color: '#888' }}>
          ⏳ Loading task, please wait...
        </p>
      ) : taskData ? (
        <TaskForm onSubmit={handleSubmit} taskData={taskData} />
      ) : (
        <p style={{ color: 'crimson' }}>❌ Task not found or invalid ID.</p>
      )}
    </div>
  );
};

export default EditTask;
