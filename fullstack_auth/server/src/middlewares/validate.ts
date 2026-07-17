import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
// import { ZodTypeAny } from "zod";

export const validate = (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const firstError = err.issues[0]
                return res.status(400).json({
                    success: false,
                    message: firstError?.message,
                    // message: "Validation failed",
                    errors: err.issues.map((e) => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                });
            }

            next(err);
        }
    }