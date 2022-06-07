import { object, string, TypeOf } from "zod";

export const loginSchema = {
    body: object({
        email: string({
            required_error: "email is required",
        }).email("email isn't valid!"),
        password: string({
            required_error: "password is required",
        }).min(6, "password must be at least 6 characters")
        .max(64, "password must not be longer than 64 characters"),
    }),
};

export type Loginbody = TypeOf<typeof loginSchema.body>;