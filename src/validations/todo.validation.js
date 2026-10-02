import joi from "joi";

export const todoschema = joi.object({
    task: joi.string().required().min(3).max(100),
    status: joi.boolean().required()
})