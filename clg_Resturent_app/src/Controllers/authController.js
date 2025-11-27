import { customers } from "../database/memory.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//SIGNUP
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = customers.find((c) => c.email === email);

    if (exists) {
      const error = new Error("Customer already exists!");
      error.status = 400;
throw error;
    }

    const hashed = await bcrypt.hash(password, 10);
    const newCustomer = {
      id: customers.length + 1,
      name,
      email,
      password: hashed,
    };

    customers.push(newCustomer);

    res.status(201).json({
      success: true,
      signup: "Signup Successful",
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

//LOGIN
// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const customer = customers.find((c) => c.email === email);

//     if (!customer) {
//       const error = new Error("Customer does not exist!");
//       error.status = 404;
//       throw error;
//     }

//     const match = await bcrypt.compare(password, customer.password);
//     if (!match) {
//       const error = new Error("Invalid password!");
//       error.status = 401;
//       throw error;
//     }

//     const token = jwt.sign(
//       {
//         id: customer.id,
//         email: customer.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({
//       success: true,
//       login: "Login Successful",
//       token,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// LOGIN controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = customers.find((c) => c.email === email);

    if (!customer) {
      const error = new Error("Customer does not exist!");
      error.status = 404;
      throw error;
    }

    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      const error = new Error("Invalid password!");
      error.status = 401;
      throw error;
    }

    // Sign JWT token with secret key from env
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      login: "Login Successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

//extract body -> usename, password
//find user, if not error
//if found, compare password
//send token to user