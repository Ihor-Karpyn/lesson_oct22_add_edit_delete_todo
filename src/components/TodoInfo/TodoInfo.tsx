import { FC, useState } from 'react';
import cn from 'classnames';
import { FullTodo, OnEdit, Todo } from '../../types';
import { UserInfo } from '../UserInfo';
import { TodoForm } from '../TodoForm/TodoForm';

interface Props {
  todo: FullTodo;
  onDelete: (todoId: number) => void;
  onEdit: OnEdit;
}

export const TodoInfo: FC<Props> = ({ todo, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditTodo = (title: string, userId: number) => {
    setIsEdit(false);
    onEdit(todo.id, title, userId);
  };

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      {isEdit && (
        <TodoForm
          onSubmit={handleEditTodo}
          defaultTitle={todo.title}
          defaultUserId={todo.userId}
        />
      )}

      {!isEdit && (
        <>
          <button type="button" onClick={() => onDelete(todo.id)}>
            X
          </button>

          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          {todo.user
            ? <UserInfo user={todo.user} />
            : <p>No user</p>
          }
          <button type="button" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        </>
      )}

    </article>
  );
};
