import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) throw "token invalid";
    const verifyAuthor = verify(token, process.env.KEY_JWT!);
    req.author = verifyAuthor as Author;

    console.log(req.author);

    next();
  } catch (error) {
    res.status(500).send({
      status: "register error",
      message: error,
    });
  }
};

export const checkSuspend = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.author?.isAuthor) throw "unauthorized (author only)";
    next();
  } catch (error) {
    res.status(500).send({
      status: "register error",
      message: error,
    });
  }
};
