import React from 'react';

function FilterBar({ categoryFilter, setCategoryFilter, deadlineFilter, setDeadlineFilter }) {
  const categories = ['All', 'Work', 'Personal', 'Learning'];
  const deadlines = ['All', 'Today', 'This Week', 'Overdue'];

  return (
    <div className="mb-6 flex justify-center gap-4 flex-wrap">
      <div>
        <p className="mb-1 font-semibold text-gray-700">Category:</p>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 font-semibold text-gray-700">Deadline:</p>
        <div className="flex gap-2">
          {deadlines.map((d) => (
            <button
              key={d}
              onClick={() => setDeadlineFilter(d)}
              className={`px-3 py-1 rounded ${
                deadlineFilter === d
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
