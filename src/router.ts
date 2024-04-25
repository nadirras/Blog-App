import express, { Request, Response, Router } from "express";
import { authorRouter } from "./routers/author.router";
import { articleRouter } from "./routers/article.router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    status: "ok",
    message: "Welcome to my API",
  });
});

router.use("/author", authorRouter);
router.use("/article", articleRouter);

export default router;
