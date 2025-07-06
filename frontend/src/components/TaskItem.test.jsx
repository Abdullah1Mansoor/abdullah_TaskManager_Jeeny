import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import React from 'react';

describe('TaskItem Component', () => {
  const task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Desc',
    deadline: new Date().toISOString(),
    category: 'Work',
    isCompleted: false,
  };

  const setTasks = jest.fn();
  const setEditingTask = jest.fn();

  test('renders task details', () => {
    render(<TaskItem task={task} setTasks={setTasks} setEditingTask={setEditingTask} />);

    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByText(/test desc/i)).toBeInTheDocument();
    expect(screen.getByText(/work/i)).toBeInTheDocument();
  });

  test('calls setEditingTask when edit button clicked', () => {
    render(<TaskItem task={task} setTasks={setTasks} setEditingTask={setEditingTask} />);

    fireEvent.click(screen.getByText('✏️'));

    expect(setEditingTask).toHaveBeenCalledWith(task);
  });
});
