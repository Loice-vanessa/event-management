import { Request, Response } from 'express';
import {
  sendResponse,
  hashPassword,
  generateToken,
  comparePassword,
} from '../utils';
import { UserAttributes } from '../database/models/user';
import database from '../database';

interface UserRequestAttribute
  extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

const createUser = async (
  req: Request<object, object, UserRequestAttribute>,
  res: Response,
) => {
  try {
    const user = req.body;

    const userExists = await database.User.findOne({
      where: { email: user.email.trim() },
    });
    if (userExists) {
      return sendResponse(res, 400, null, 'User already exists!');
    }

    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
    const newUser = await database.User.create(user);
    return sendResponse(res, 201, newUser, 'User created successfully!');
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await database.User.findAll();
    return sendResponse(res, 200, users);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await database.User.findByPk(id);
    if (!user) {
      return sendResponse(res, 404, null, 'User not found!');
    }
    return sendResponse(res, 200, user);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await database.User.findByPk(id);
    if (!user) {
      return sendResponse(res, 404, null, 'User not found!');
    }
    await user.destroy({
      force: true,
    });
    return sendResponse(res, 200, null, 'User deleted successfully!');
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

const login = async (
  req: Request<
    object,
    object,
    {
      email: string;
      password: string;
    }
  >,
  res: Response,
) => {
  try {
    const { email, password } = req.body;
    const user = await database.User.findOne({
      where: { email: email.trim() },
    });
    if (!user) {
      return sendResponse(res, 404, null, 'User not found!');
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, null, 'Wrong credentials!');
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return sendResponse(res, 200, { token });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

const userProfile = async (req: Request, res: Response) => {
  try {
    const userinfo = req.user as UserAttributes;
    const user = await database.User.findOne({
      where: { id: userinfo.id },
      attributes: { exclude: ['password'] },
    });
    return sendResponse(res, 200, user);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    return sendResponse(res, 500, null, errorMessage);
  }
};

export const userController = {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  login,
  userProfile,
};
