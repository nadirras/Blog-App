import { Router } from "express";
import {
  authorLogin,
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthorById,
  updateAuthor,
  verifyAuthor,
} from "../controllers/author.controller";
import { checkSuspend, verifyToken } from "../middlewares/author.middleware";

const authorRouter = Router();
authorRouter.post("/", createAuthor);
authorRouter.post("/login", authorLogin);
authorRouter.get("/");
authorRouter.get("/verify", verifyToken, verifyAuthor);
authorRouter.get("/:id", getAuthorById);
authorRouter.patch("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);

export { authorRouter };
