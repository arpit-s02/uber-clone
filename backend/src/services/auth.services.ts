import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const generateAuthToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET);
  return token;
};
