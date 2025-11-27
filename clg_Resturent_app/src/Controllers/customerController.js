import { validationResult } from "express-validator";
import { customers } from "../database/memory.js";

//getCustomers
export const getCustomers = (req, res, next) => {
  try {
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

// //addCustomer
// export const addCustomer = (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, phone, email } = req.body;

//     const newCustomer = {
//       id: customers.length + 1,
//       name,
//       phone,
//       email,
//     };

//     customers.push(newCustomer);

//     res.status(201).json({ success: true, inserted: newCustomer });
//   } catch (err) {
//     next(err);
//   }
// };
