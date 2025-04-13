import { Request, RequestHandler, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.services";
import { StatusCodes } from "http-status-codes";
import { comparePassword, generateAuthToken } from "../services/auth.services";
import { validationResult } from "express-validator";
import { RequestWithUser } from "../types/user.types";

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // check if password and confirm password are same
    if (password !== confirmPassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password and confirm password do not match" });
      return;
    }

    // check if a user with given email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: "A user with this email already exists" });
      return;
    }

    // create account
    const { password: userPassword, ...user } = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    //generate token
    const token = generateAuthToken(user.id);

    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    console.log("error while registering", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    // find user by email
    const user = await findUserByEmail(email);
    if(!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password" });
      return;
    }

    // confirm given password with user's password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password" });
      return;
    }

    // generate token
    const token = generateAuthToken(user.id);

    const { password: userPassword, ...responseUser } = user;
    res.json({ user: responseUser, token });
  } catch (error) {
    console.log("error while logging in", error);
  }
}

export const getProfile = async (req: Request, res: Response) => {
  const { user: authenticatedUser } = req as RequestWithUser;
  const { password, ...user } = authenticatedUser;

  res.json(user);
}
