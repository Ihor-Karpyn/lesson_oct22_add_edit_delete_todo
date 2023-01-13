import './App.scss';
import { useState } from 'react';
import { getPreparedTodos } from './helpers/todo.helpers';
import { TodoList } from './components/TodoList';
import users from './api/users';
import { FullTodo, OnEdit } from './types';
import { getNewId } from './helpers/app.helpers';
import { findUserById } from './helpers/user.helpers';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState(getPreparedTodos);

  const addTodo = (title: string, userId: number) => {
    setTodos((prevTodos) => {
      const newTodo: FullTodo = {
        id: getNewId(prevTodos),
        user: findUserById(userId),
        title,
        userId,
        completed: false,
      };

      return [...prevTodos, newTodo];
    });
  };

  const deleteTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todoEL => todoEL.id !== todoId);
    });
  };

  const editTodo: OnEdit = (editedTodoId, title, userId) => {
    setTodos((prevTodos) => prevTodos.map(todoEl => {
      if (todoEl.id !== editedTodoId) {
        return todoEl;
      }

      return {
        ...todoEl,
        title,
        userId,
        user: findUserById(userId),
      };
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
    </div>
  );
};
