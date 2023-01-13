import { FullTodo } from '../types';
import todos from '../api/todos';
import { findUserById } from './user.helpers';

export const getPreparedTodos = (): FullTodo[] => {
  return todos.map(todo => {
    return {
      ...todo,
      user: findUserById(todo.userId),
    };
  });
};
