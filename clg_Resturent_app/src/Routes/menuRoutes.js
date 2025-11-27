import express from "express";
import { body } from "express-validator";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenu,
} from "../Controllers/menuController.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/", getMenu);

router.delete("/:id",auth, deleteMenuItem);

router.post(
  "/add",
  [
    body("name").notEmpty().withMessage("Name is required!"),
    body("price").notEmpty().withMessage("Price is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price needs to be greater than 0!"),
  ],auth,
  addMenuItem
);

router.put(
  "/:id",
  [
    body("name").optional().notEmpty(),
    body("price").optional().isFloat({ gt: 0 }),
  ],auth,
  updateMenuItem
);

export default router;