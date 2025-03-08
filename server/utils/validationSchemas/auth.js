import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]{3,20}$/),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().min(1).max(120),
  password: z.string().minLength(8),
  role: z.enum(["admin", "moderator", "member", "guest"]),
});

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const profileSchema = z.object({
  userId: z.string().optional(),
});
