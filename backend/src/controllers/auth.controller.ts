import { Request, Response } from "express";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";

const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    fullname: z.string().min(3, "Fullname must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"]),
    profilePic: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["ConfirmPassword"],
  });

export const signup = async (req: Request, res: Response) => {
  try {
    //Validating request body using zod
    const parsedData = signupSchema.parse(req.body);

    //Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username: parsedData.username },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "username is already taken",
      });
    }

    //Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(parsedData.password, salt);

    //Create new user
    const newUser = await prisma.user.create({
      data: {
        username: parsedData.username,
        fullname: parsedData.fullname,
        password: hashedPassword,
        gender: parsedData.gender,
        profilePic: parsedData.profilePic || "",
      },
    });

    //Generate JWT token and send as cookie to the client.
    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        fullname: newUser.fullname,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        errors: err.errors,
      });
    }
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = (req: Request, res: Response) => {
  res.send("login");
};

export const logout = (req: Request, res: Response) => {
  res.send("logout");
};
