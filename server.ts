import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import errorHandler from "./middlewares/error.middleware";
import attributeRouter from "./modules/attribute/attribute.route";

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello from forms-module ${JSON.stringify(req.query)}`).end();
});

app.use("/attribute", attributeRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3113;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});
