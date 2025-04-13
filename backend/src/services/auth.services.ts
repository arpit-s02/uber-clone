import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

export const generateAuthToken = (id: number) => {
  const token = jwt.sign({ id }, JWT_SECRET);
  return token;
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  return payload;
};
