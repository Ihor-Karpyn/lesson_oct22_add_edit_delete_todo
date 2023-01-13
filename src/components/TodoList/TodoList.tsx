import { FC } from 'react';
import { FullTodo, OnEdit } from '../../types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: FullTodo[];
  onDelete: (todoId: number) => void;
  onEdit: OnEdit;
}

export const TodoList: FC<Props> = ({ todos, onDelete, onEdit }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        key={todo.id}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </section>
);
