import users from '../api/users';
import { User } from '../types';

export const findUserById = (userId: number): User | undefined => {
  return users.find(user => user.id === userId);
};
