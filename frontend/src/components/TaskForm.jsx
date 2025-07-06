import React, { useState, useEffect } from 'react';

function TaskForm({ onAddTask, onUpdateTask, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Work');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDeadline(editingTask.deadline);
      setCategory(editingTask.category);
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setCategory('Work');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      id: editingTask?.id,
      title,
      description,
      deadline,
      category,
      isCompleted: editingTask?.isCompleted || false,
    };

    if (editingTask) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-6">
      {/* Title */}
      <div className="relative">
        <input
          id="title"
          type="text"
          placeholder=" "
          className="peer block w-full appearance-none border border-gray-300 rounded-lg bg-transparent px-3 pt-6 pb-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label
          htmlFor="title"
          className="absolute left-3 top-2 text-gray-500 text-sm transition-all
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-blue-600"
        >
          Task Title
        </label>
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          id="description"
          placeholder=" "
          className="peer block w-full resize-none appearance-none border border-gray-300 rounded-lg bg-transparent px-3 pt-6 pb-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <label
          htmlFor="description"
          className="absolute left-3 top-2 text-gray-500 text-sm transition-all
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-blue-600"
        >
          Description
        </label>
      </div>

      {/* Deadline */}
      <div className="relative">
        <input
          id="deadline"
          type="datetime-local"
          placeholder=" "
          className="peer block w-full appearance-none border border-gray-300 rounded-lg bg-transparent px-3 pt-6 pb-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <label
          htmlFor="deadline"
          className="absolute left-3 top-2 text-gray-500 text-sm transition-all
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-blue-600"
        >
          Deadline
        </label>
      </div>

      {/* Category */}
      <div className="relative">
        <select
          id="category"
          className="peer block w-full appearance-none border border-gray-300 rounded-lg bg-transparent px-3 pt-6 pb-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
        </select>
        <label
          htmlFor="category"
          className="absolute left-3 top-2 text-gray-500 text-sm transition-all
            peer-placeholder-shown:top-5
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2
            peer-focus:text-sm
            peer-focus:text-blue-600"
        >
          Category
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full
          bg-white
          text-blue-700
          border-2 border-blue-700
          py-4
          rounded-lg
          font-extrabold
          shadow-md
          hover:bg-blue-700
          hover:text-white
          active:bg-blue-800
          transition
          duration-200
          focus:outline-none
          focus:ring-4
          focus:ring-blue-400
          select-none
        "
      >
        {editingTask ? 'Update Task' : '➕ Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
