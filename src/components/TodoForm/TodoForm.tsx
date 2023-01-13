import React, { FC, useState } from 'react';
import users from '../../api/users';

interface Props {
  onSubmit: (title: string, userId: number) => void;
  defaultTitle?: string;
  defaultUserId?: number;
}

export const TodoForm: FC<Props> = (props) => {
  const {
    onSubmit,
    defaultTitle = '',
    defaultUserId = 0,
  } = props;

  const [title, setTitle] = useState(defaultTitle);
  const [userId, setUserId] = useState(defaultUserId);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleFormSubmit = () => {
    if (!title || !userId) {
      setHasTitleError(!title);
      setHasUserIdError(!userId);

      return;
    }

    onSubmit(title, userId);

    resetForm();
  };

  return (
    <form
      action="/api/users"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(event) => {
            setHasTitleError(false);
            setTitle(event.target.value);
          }}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setHasUserIdError(false);
            setUserId(+event.target.value);
          }}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Submit
      </button>
    </form>
  );
};
