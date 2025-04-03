import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config";
import routes from "./routes";

const app = express();
const port = PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log("Server is up and running on port", port);
});
