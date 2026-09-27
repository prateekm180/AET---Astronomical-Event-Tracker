import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export class AuthService {
  static async registerUser(email: string, password: string, username: string) {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      throw new Error("User with given email or username already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
      },
    });

    return { id: user.id, email: user.email, username: user.username };
  }

  static async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    return { id: user.id, email: user.email, username: user.username };
  }
}