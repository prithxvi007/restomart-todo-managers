import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API}/api/tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (_id) => {
    if (!_id) {
      console.error('Invalid taskId for deletion:', _id);
      return;
    }
    try {
      const res = await fetch(`${API}/api/tasks/${_id}`, { method: 'DELETE' });
      if (res.ok) {
        setTasks(prev => prev.filter(t => t._id !== _id));
      } else {
        console.error('Task delete failed:', await res.text());
      }
    } catch (err) {
      console.error('Delete request failed:', err);
    }
  };

  const filteredTasks =
    statusFilter === 'all'
      ? tasks
      : tasks.filter(task => task.status === statusFilter);

  return (
    <div className="page">
      <h1 style={{ marginBottom: '0.5rem' }}>📝 Task Dashboard</h1>

      <div className="filter-bar" style={{ marginBottom: '1rem' }}>
        <label>Status Filter:</label>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <Link className="btn" to="/add" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        ➕ Add Task
      </Link>

      {loading ? (
        <p className="loading-message" style={{ marginTop: '1rem', fontStyle: 'italic', color: '#666' }}>
          ⏳ Loading tasks, please wait...
        </p>
      ) : (
        <div className="task-list" style={{ marginTop: '1rem' }}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => navigate(`/edit/${task._id}`)}
                onDelete={() => handleDelete(task._id)}
              />
            ))
          ) : (
            <p style={{ color: '#999' }}>No tasks found for selected filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
