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
    console.log("Error in Signup Controller", err.message);
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        errors: err.errors,
      });
    }
    res.status(500).json({ error: "Server Error" });
  }
};

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at lest 3 character long"),
  password: z.string().min(3, "Password must be at least 6 character long"),
});

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.parse(req.body);

    //Find the user in the database by username
    const user = await prisma.user.findUnique({
      where: {
        username: parsedData.username,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      parsedData.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Invalid Credentials" });
    }

    //Generate token and send cookie to the client
    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in login Controller", error.message);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.cookie("jwt-token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout Controller", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
