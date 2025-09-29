import { User, type UserCreationAttributes } from "../models/users.js";

export const getUsersService = async (): Promise<User[]> => {
  return await User.findAll();
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
  return await User.findByPk(id);
}

export const addUserService = async (newUser: UserCreationAttributes): Promise<User> => {
  return await User.create(newUser);
};

export const deleteUserService = async (id: number): Promise<boolean> => {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await user.destroy();
  return true;
}

export const updateUserService = async (id: number, updatedUser: Partial<UserCreationAttributes>): Promise<User | null> => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  await user.update(updatedUser);
  return user;
}