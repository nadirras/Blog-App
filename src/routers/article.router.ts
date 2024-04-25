import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticleById,
  updateArticle,
} from "../controllers/article.controller";

const articleRouter = Router();
articleRouter.post("/", createArticle);
articleRouter.get("/", getArticle);
articleRouter.get("/:slug", getArticleById);
articleRouter.patch("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export { articleRouter };
