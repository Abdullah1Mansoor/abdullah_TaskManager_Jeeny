import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';  
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { fetchTasks, createTask, editTask } from '../api';

const socket = io('http://localhost:3001'); 

function Home() {
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const syncTasks = async () => {
    try {
      const data = await fetchTasks();
      const formatted = data.map((task) => ({
        ...task,
        isCompleted: task.is_completed === 1,
        deadlineDate: task.deadline ? new Date(task.deadline) : null,
        notified: false,
      }));
      setTasks(formatted);
      localStorage.setItem('cachedTasks', JSON.stringify(formatted));
    } catch (err) {
      const cached = localStorage.getItem('cachedTasks');
      if (cached) {
        setTasks(JSON.parse(cached));
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    syncTasks();
    window.addEventListener('focus', syncTasks);
    return () => window.removeEventListener('focus', syncTasks);
  }, []);

  // Setup Socket.IO event listeners for real-time sync
  useEffect(() => {
    socket.on('taskAdded', (newTask) => {
      setTasks((prev) => {
        if (prev.some((task) => task.id === newTask.id)) return prev;
        return [{
          ...newTask,
          isCompleted: newTask.is_completed === 1,
          deadlineDate: newTask.deadline ? new Date(newTask.deadline) : null,
          notified: false,
        }, ...prev];
      });
    });

    socket.on('taskUpdated', (updatedTask) => {
  setTasks((prev) =>
    prev.map((task) => {
      if (task.id === updatedTask.id) {
        if (updatedTask.is_completed !== undefined) {
          return {
            ...task,
            isCompleted: updatedTask.is_completed === 1 || updatedTask.is_completed === true,
            notified: false,
          };
        }
        return {
          ...task,
          ...updatedTask,
          deadlineDate: updatedTask.deadline ? new Date(updatedTask.deadline) : task.deadlineDate,
          notified: false,
        };
      }
      return task;
    })
  );
});


    socket.on('taskDeleted', (deletedId) => {
      setTasks((prev) => prev.filter((task) => task.id !== deletedId));
    });

    return () => {
      socket.off('taskAdded');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  // Notification effect (unchanged)
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const notifyUpcomingDeadlines = () => {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

      tasks.forEach((task) => {
        if (
          task.deadlineDate &&
          !task.isCompleted &&
          task.deadlineDate > now &&
          task.deadlineDate <= oneHourLater &&
          !task.notified
        ) {
          new Notification(`⏰ Upcoming: ${task.title}`, {
            body: `Due at ${task.deadlineDate.toLocaleTimeString()}`,
          });

          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id ? { ...t, notified: true } : t
            )
          );
        }
      });
    };

    const intervalId = setInterval(notifyUpcomingDeadlines, 60000);
    return () => clearInterval(intervalId);
  }, [tasks]);

 const addTask = async (task) => {
  await createTask(task); // Let the socket event handle UI update
};


  const handleUpdate = async (updatedTask) => {
    await editTask(updatedTask.id, updatedTask);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id
          ? {
              ...updatedTask,
              deadlineDate: updatedTask.deadline ? new Date(updatedTask.deadline) : null,
              notified: false,
            }
          : t
      )
    );
    setEditingTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const endOfWeek = new Date(startOfToday);
  endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;

    if (!task.deadlineDate) return deadlineFilter === 'All';

    switch (deadlineFilter) {
      case 'Today':
        return task.deadlineDate >= startOfToday && task.deadlineDate <= endOfToday;
      case 'This Week':
        return task.deadlineDate >= startOfToday && task.deadlineDate <= endOfWeek;
      case 'Overdue':
        return task.deadlineDate < now && !task.isCompleted;
      default:
        return true;
    }
  });

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 select-none">
          Smart Task Manager
        </h1>
        <button
          onClick={handleLogout}
          className="
            bg-white 
            text-blue-700 
            border-2 border-blue-700 
            px-6 py-3 
            rounded-lg 
            font-semibold 
            shadow-md 
            hover:bg-blue-700 
            hover:text-white 
            active:bg-blue-800 
            transition 
            duration-200
            focus:outline-none
            focus:ring-4 
            focus:ring-blue-300
            select-none
          "
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      <TaskForm
        onAddTask={addTask}
        onUpdateTask={handleUpdate}
        editingTask={editingTask}
      />

      <FilterBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        deadlineFilter={deadlineFilter}
        setDeadlineFilter={setDeadlineFilter}
      />

      <TaskList
        tasks={filteredTasks}
        setTasks={setTasks}
        setEditingTask={setEditingTask}
      />
    </div>
  );
}

export default Home;
