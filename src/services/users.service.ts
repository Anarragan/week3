import type {IUser} from "../interfaces/user.interface.js";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersFilePath = join(__dirname, '../models/users.json');

export const getUsersService = async (): Promise<IUser[]> => {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) as IUser[];
}

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  const data = await fs.readFile(usersFilePath, "utf-8")
  const users = JSON.parse(data) as IUser[]

  return users.find((user) => user.id === id) || null
}

export const addUserService = async (newUser: IUser): Promise<IUser> => {
  const data = await fs.readFile(usersFilePath, "utf-8")
  const users: IUser[] = JSON.parse(data)
  users.push(newUser)
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))

  return newUser
}

export const deleteUserService = async (id: string): Promise<boolean> => {
  const file = await fs.readFile(usersFilePath, "utf-8")
  const users: IUser[] = JSON.parse(file)
  const index = users.findIndex((user) => user.id === id)

  if(index === -1) {
    return false
  }

  users.splice(index, 1)
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))
  return true
}

export const updateUserService = async (id: string, updatedUser: Partial<IUser>): Promise<IUser | null> => {
  const file = await fs.readFile(usersFilePath, "utf-8")
  const users: IUser[] = JSON.parse(file)
  const index = users.findIndex((user) => user.id === id)

  if(index === -1) {
    return null
  }

  const existingUser = users[index];
  if (!existingUser) {
    return null;
  }
  const updated: IUser = {
    ...existingUser,
    ...updatedUser,
  };
  users[index] = updated;

  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  return updated;
}