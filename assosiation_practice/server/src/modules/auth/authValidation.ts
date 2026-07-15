import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1, "FIrst name is required").max(50, "First name must not exceed 50 characters"),
    lastName: z.string().min(1, "Last name is required").max(50,"Last name must not exceed 50 characters"),
    email: z.email("Invalid email formate"),
    password: z.string().min(6, "Password must be between 6 to 100 characters").max(100,"Password too long"),
    phone: z.string().min(7, "Invalid phone number").max(15,"Invalid phone number"),
})

export const loginSchema = z.object({
    email: z.email("Invalid email formate"),
    password: z.string().min(6, "Password is required")
})

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;