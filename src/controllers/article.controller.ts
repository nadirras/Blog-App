import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createArticle = async (req: Request, res: Response) => {
  try {
    const slug = req.body.title.toLowerCase().replaceAll(" ", "-");
    req.body.slug = slug;
    await prisma.article.create({
      data: req.body,
    });

    res.status(201).send({
      status: "ok",
      message: "article created",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const articles = await prisma.article.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
      include: {
        author: true,
      },
    });
    const countArticle = await prisma.article.count();
    res.status(200).send({
      status: "ok",
      articles,
      page,
      countArticle,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    // const { slug } = req.params;
    // console.log("Slug:", slug);
    console.log("Request Params:", req.params); // Debug
    const articles = await prisma.article.findUnique({
      where: {
        slug: req.params.slug,
      },
      include: {
        author: true,
      },
    });

    res.status(200).send({
      status: "ok",
      articles,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    await prisma.article.update({
      where: {
        article_id: +req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      status: "ok",
      message: "article updated",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    await prisma.article.delete({
      where: {
        article_id: +req.params.id,
      },
    });
    res.status(200).send({
      status: "ok",
      message: "article deleted",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};
