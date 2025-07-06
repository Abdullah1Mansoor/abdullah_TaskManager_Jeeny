import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks, setEditingTask }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 italic mt-6">
        No tasks yet. Start by adding one!
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          setTasks={setTasks}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
