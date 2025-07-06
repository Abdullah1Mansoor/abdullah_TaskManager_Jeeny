import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const onAddTask = jest.fn();
  const onUpdateTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input fields and button', () => {
    render(<TaskForm onAddTask={onAddTask} onUpdateTask={onUpdateTask} editingTask={null} />);

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/add task/i);
  });

  test('calls onAddTask when submitting new task', () => {
    render(<TaskForm onAddTask={onAddTask} onUpdateTask={onUpdateTask} editingTask={null} />);

    fireEvent.change(screen.getByLabelText(/task title/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Desc' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Work' } });
    fireEvent.click(screen.getByRole('button'));

    expect(onAddTask).toHaveBeenCalled();
    expect(onAddTask.mock.calls[0][0].title).toBe('New Task');
  });

  test('shows Update Task button when editingTask is set', () => {
    const task = {
      id: 1,
      title: 'Edit Me',
      description: 'Desc',
      deadline: '',
      category: 'Work',
      isCompleted: false,
    };

    render(<TaskForm onAddTask={onAddTask} onUpdateTask={onUpdateTask} editingTask={task} />);

    expect(screen.getByRole('button')).toHaveTextContent(/update task/i);
    expect(screen.getByDisplayValue(/edit me/i)).toBeInTheDocument();
  });
});
