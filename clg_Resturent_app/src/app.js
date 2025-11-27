import express from "express";
import logger from "./Middleware/logger.js";
import errorHandler from "./Middleware/errorHandler.js";
import handler404 from "./Middleware/404handler.js";
import menuRouter from "./Routes/menuRoutes.js";
import orderRouter from "./Routes/orderRoute.js";
import customerRouter from "./Routes/customerRoute.js";
import authRouter from "./Routes/authRoute.js";
const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Restaurant Ordering API" });
});
//mounting
app.use("/menu", menuRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

app.use(handler404);
app.use(errorHandler);

export default app;
