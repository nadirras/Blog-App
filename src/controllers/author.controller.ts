import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import { transporter } from "../helpers/nodemailer";

const prisma = new PrismaClient({ log: ["error", "info", "query", "warn"] });

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    const authors = await prisma.author.create({
      data: {
        ...req.body,
        password: hashPassword,
      },
    });

    const payload = {
      id: authors.id,
    };
    const token = sign(payload, process.env.KEY_JWT!, { expiresIn: "1h" });
    const link = `http://localhost:3000/verify/${token}`;

    const templatePath = path.join(__dirname, "../templates", "register.html");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);
    const html = compiledTemplate({
      name: authors.name,
      link,
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: authors.email,
      subject: "Welcome to Charred Log",
      html,
    });

    res.status(201).send({
      status: "ok",
      message: "author registered",
      authors,
    });
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: err,
    });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const authors = await prisma.author.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
    });
    const countAuthor = await prisma.author.count();
    res.status(200).send({
      status: "ok",
      authors,
      page,
      countAuthor,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    res.status(200).send({
      status: "ok",
      authors,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const authorLogin = async (req: Request, res: Response) => {
  try {
    const { data, password } = req.body;
    const authors = await prisma.author.findFirst({
      where: {
        OR: [{ name: data }, { email: data }],
      },
    });
    if (authors === null) throw "user not found";
    const isValidPass = await compare(password, authors.password);
    // if (users.password !== password) throw "incorrect password";
    if (!isValidPass) throw "incorrect password";

    const payload = {
      id: authors.id,
    };

    const token = sign(payload, process.env.KEY_JWT!, { expiresIn: "5m" });

    res.status(200).send({
      status: "ok",
      authors,
      token,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const keepLogin = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.findFirst({
      where: { id: req.author?.id },
    });
    res.status(200).send({
      status: "ok",
      author,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    await prisma.author.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      status: "ok",
      message: "author updated",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    await prisma.author.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send({
      status: "ok",
      message: "author deleted",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const verifyAuthor = async (req: Request, res: Response) => {
  try {
    console.log(req.author?.id);
    await prisma.author.update({
      data: {
        isActive: true,
      },
      where: {
        id: req.author?.id,
      },
    });

    res.status(200).send({
      status: "ok",
      message: "verify account success",
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      status: "ok",
      message: error,
    });
  }
};
