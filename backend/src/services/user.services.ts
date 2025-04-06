import { hashPassword } from "./auth.services";
import { PrismaClient } from "@prisma/client";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const client = new PrismaClient();

export const createUser = async (userDetails: UserDetails) => {
  const { firstName, lastName, email, password } = userDetails;
  const hashedPassword = await hashPassword(password);
  const user = await client.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await client.user.findUnique({
    where: { email },
  });

  return user;
};

export const findUserById = async (id: number) => {
  const user = await client.user.findUnique({
    where: { id }
  })

  return user;
}
