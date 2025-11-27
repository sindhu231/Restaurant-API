import { validationResult } from "express-validator";
import { menu } from "../database/memory.js";

//getMenu
export const getMenu = (req, res, next) => {
  try {
    res.json(menu);
  } catch (err) {
    next(err);
  }
};

//addMenuItem
export const addMenuItem = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price } = req.body;

    const newItem = {
      id: menu.length + 1,
      name,
      price,
    };

    menu.push(newItem);

    res.status(201).json({ success: true, inserted: newItem });
  } catch (err) {
    next(err);
  }
};

//updateMenuItem
export const updateMenuItem = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const item = menu.find((item) => item.id == id);

    if (!item) {
      const error = new Error("Menu Item does not exist!");
      error.status = 404;
      throw error;
    }

    const { name, price } = req.body;

    if (name) item.name = name;
    if (price) item.price = price;

    res.json({ success: true, updated: item });
  } catch (err) {
    next(err);
  }
};
//deleteMenuItem
export const deleteMenuItem = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = menu.findIndex((item) => item.id == id);

    if (index == -1) {
      const error = new Error("Menu Item does not exist!");
      error.status = 404;
      throw error;
    }

    const item = menu.splice(index, 1);

    res.json({ success: true, deleted: item });
  } catch (err) {
    next(err);
  }
};