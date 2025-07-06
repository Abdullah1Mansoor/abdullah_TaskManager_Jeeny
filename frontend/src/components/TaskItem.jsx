// import React from 'react';
// import { updateTaskStatus, deleteTask as apiDeleteTask } from '../api';

// function TaskItem({ task, setTasks, setEditingTask }) {
//   const toggleComplete = async () => {
//     await updateTaskStatus(task.id, !task.isCompleted);
//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
//       )
//     );
//   };

//   const deleteTask = async () => {
//     await apiDeleteTask(task.id);
//     setTasks((prev) => prev.filter((t) => t.id !== task.id));
//   };

//   // Reminder logic: deadline within 1 hour or overdue and not completed
//   const now = new Date();
//   const deadlineDate = task.deadlineDate || (task.deadline ? new Date(task.deadline) : null);
//   const isNearDeadline =
//     deadlineDate &&
//     !task.isCompleted &&
//     (deadlineDate < now || (deadlineDate - now) / 1000 / 60 <= 60); // less than 60 minutes or overdue

//   return (
//     <div className="border rounded p-4 flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition">
//       <div className="flex-1">
//         <h3
//           className={`font-bold text-lg ${
//             task.isCompleted ? 'line-through text-gray-400' : ''
//           }`}
//         >
//           {task.title}
//         </h3>
//         {task.description && <p className="text-sm mt-1">{task.description}</p>}
//         <p className="text-xs text-gray-500 mt-1">
//           📅{' '}
//           {task.deadline
//             ? new Date(task.deadline).toLocaleString()
//             : 'No deadline'}
//         </p>
//         <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
//           {task.category}
//         </span>
//         {isNearDeadline && (
//           <p className="text-red-600 font-semibold mt-2 select-none">
//             ⚠️ Deadline approaching or overdue!
//           </p>
//         )}
//       </div>
//       <div className="space-x-3 flex flex-col items-center">
//         <button
//           onClick={toggleComplete}
//           className="text-green-600 text-lg select-none hover:text-green-800 transition"
//           title={task.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
//           aria-label="Toggle Complete"
//         >
//           ✅
//         </button>
//         <button
//           onClick={() => setEditingTask(task)}
//           className="text-yellow-500 text-lg select-none hover:text-yellow-700 transition"
//           title="Edit Task"
//           aria-label="Edit Task"
//         >
//           ✏️
//         </button>
//         <button
//           onClick={deleteTask}
//           className="text-red-500 text-lg select-none hover:text-red-700 transition"
//           title="Delete Task"
//           aria-label="Delete Task"
//         >
//           🗑️
//         </button>
//       </div>
//     </div>
//   );
// }

// export default TaskItem;
import React from 'react';
import { updateTaskStatus, deleteTask as apiDeleteTask } from '../api';

function TaskItem({ task, setTasks, setEditingTask }) {
  const toggleComplete = async () => {
    // Only call the API, no local state update here
    await updateTaskStatus(task.id, !task.isCompleted);
    // The UI update will come from the socket event 'taskUpdated'
  };

  const deleteTask = async () => {
    await apiDeleteTask(task.id);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  // Reminder logic: deadline within 1 hour or overdue and not completed
  const now = new Date();
  const deadlineDate = task.deadlineDate || (task.deadline ? new Date(task.deadline) : null);
  const isNearDeadline =
    deadlineDate &&
    !task.isCompleted &&
    (deadlineDate < now || (deadlineDate - now) / 1000 / 60 <= 60); // less than 60 minutes or overdue

  return (
    <div className="border rounded p-4 flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition">
      <div className="flex-1">
        <h3
          className={`font-bold text-lg ${
            task.isCompleted ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title}
        </h3>
        {task.description && <p className="text-sm mt-1">{task.description}</p>}
        <p className="text-xs text-gray-500 mt-1">
          📅{' '}
          {task.deadline
            ? new Date(task.deadline).toLocaleString()
            : 'No deadline'}
        </p>
        <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
          {task.category}
        </span>
        {isNearDeadline && (
          <p className="text-red-600 font-semibold mt-2 select-none">
            ⚠️ Deadline approaching or overdue!
          </p>
        )}
      </div>
      <div className="space-x-3 flex flex-col items-center">
        <button
          onClick={toggleComplete}
          className="text-green-600 text-lg select-none hover:text-green-800 transition"
          title={task.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          aria-label="Toggle Complete"
        >
          ✅
        </button>
        <button
          onClick={() => setEditingTask(task)}
          className="text-yellow-500 text-lg select-none hover:text-yellow-700 transition"
          title="Edit Task"
          aria-label="Edit Task"
        >
          ✏️
        </button>
        <button
          onClick={deleteTask}
          className="text-red-500 text-lg select-none hover:text-red-700 transition"
          title="Delete Task"
          aria-label="Delete Task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
