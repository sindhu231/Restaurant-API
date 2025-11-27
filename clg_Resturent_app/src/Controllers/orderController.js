import { validationResult } from "express-validator";
import { orders, customers, menu } from "../database/memory.js";

//getOrders
export const getOrders = (req, res, next) => {
  try {
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

//getOrder
export const getOrder = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const order = orders.find((order) => order.id == id);
    if (!order) {
      const error = new Error("Order does not exist!");
      error.status = 404;
      throw error;
    }
    res.json({ success: true, viewed: order });
  } catch (err) {
    next(err);
  }
};

//createOrder
export const createOrder = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerId } = req.body;
    const customer = customers.find((c) => c.id == customerId);

    if (!customer) {
      const error = new Error("Customer does not exist in the database!");
      error.status = 404;
      throw error;
    }

    const newOrder = {
      id: orders.length + 1,
      customerId,
      items: [],
      status: "Order Placed",
    };

    orders.push(newOrder);

    res.status(201).json({ sucess: true, created: newOrder });
  } catch (err) {
    next(err);
  }
};

//updateOrderStatus
export const updateOrderStatus = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const order = orders.find((order) => order.id == id);
    if (!order) {
      const error = new Error("Order has not been created yet!");
      error.status = 404;
      throw error;
    }

    order.status = status;

    res.json({ success: true, updatedStatus: order });
  } catch (err) {
    next(err);
  }
};

//updateOrder
export const updateOrder = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(req.params.id);
    const { menuItemId } = req.body;
    const order = orders.find((order) => order.id == id);
    if (!order) {
      const error = new Error("Order has not been created yet!");
      error.status = 404;
      throw error;
    }

    order.items.push(menuItemId);

    res.json({ success: true, updatedOrder: order });
  } catch (err) {
    next(err);
}
};