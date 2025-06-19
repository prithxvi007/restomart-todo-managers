import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
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
    if (!_id) return console.error('Invalid taskId for deletion:', _id);
    try {
      const res = await fetch(`/api/tasks/${_id}`, { method: 'DELETE' });
      if (res.ok) setTasks(prev => prev.filter(t => t._id !== _id));
      else console.error('Task delete failed:', await res.text());
    } catch (err) {
      console.error('Delete request failed:', err);
    }
  };

  const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter(task => task.status === statusFilter);

  return (
    <div className="page">
      <h1>Task Dashboard</h1>
      <div className="filter-bar">
        <label>Status Filter:</label>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <Link  className="btn" to="/add">➕ Add Task</Link>
      {loading ? (
         <p className="loading-message">⏳ Loading tasks, please wait...</p>
      ) : (
        <div className="task-list" style={{ marginTop: '1rem' }}>
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => navigate(`/edit/${task._id}`)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
