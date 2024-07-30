import { check } from 'express-validator';

const content = check("content", "Content is required for note").not().isEmpty();

export const noteValidations = [content]