import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt-token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //millisecond
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

export default generateToken;
