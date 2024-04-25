import express, { Application } from "express";
import cors from "cors";

import router from "./router";

const PORT = 8000;
const app: Application = express();
app.use(cors());

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`[API] local:    http://localhost:${PORT}/api`);
});
