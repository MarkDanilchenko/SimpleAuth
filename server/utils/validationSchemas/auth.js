import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]{3,20}$/),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.number().min(1).max(120),
  password: z.string().min(8),
  role: z.enum(["admin", "moderator", "member", "guest"]),
});

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const profileSchema = z.object({
  userId: z.string().optional(),
});

export { signUpSchema, signInSchema, profileSchema };
