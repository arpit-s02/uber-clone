import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config";

const app = express();
const port = PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("uber clone");
});

app.listen(port, () => {
  console.log("Server is up and running on port", port);
});
