import express from "express";
import apiRouter from "./routes";
const app = express();

// middleware
app.use(express.json());

app.use('/api',apiRouter)

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;