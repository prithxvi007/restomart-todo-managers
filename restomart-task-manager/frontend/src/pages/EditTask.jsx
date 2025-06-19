import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return console.error('Invalid taskId:', id);

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (res.ok) setTaskData(await res.json());
        else console.error('Task not found');
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
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (res.ok) navigate('/home');
      else console.error('Update failed:', await res.text());
    } catch (err) {
      console.error('Update request failed:', err);
    }
  };

  return (
    <div className="page">
      <h1 style={{ marginBottom: '1.5rem' }}>Edit Task</h1>
      {loading ?  <p className="loading-message">⏳ Loading tasks, please wait...</p> : taskData ? (
        <TaskForm onSubmit={handleSubmit} taskData={taskData} />
      ) : <p>Task not found or invalid ID</p>}
    </div>
  );
};

export default EditTask;
