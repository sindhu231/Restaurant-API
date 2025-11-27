import express from "express";
import { signup, login } from "../Controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 10 }),
  ],
  signup
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);

export default router;
