import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/user.controllers";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage(
        "First name is required and must be atleast 3 characters long"
      ),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isString().withMessage("Password is required")
  ],
  login
)

export default router;
