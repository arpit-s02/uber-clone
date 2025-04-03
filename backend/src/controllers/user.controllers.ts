import { Request, RequestHandler, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.services";
import { StatusCodes } from "http-status-codes";
import { generateAuthToken } from "../services/auth.services";
import { validationResult } from "express-validator";

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
