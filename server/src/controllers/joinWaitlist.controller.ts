import { Request, Response } from "express";
import { JoinWaitlist } from "../models/wailist.model";


export const joinWait = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body as { email?: string };

  if (!email) {
    return res.status(400).json({
      message: "Email is required."
    });
  }

  const normalizedEmail: string = email.toLowerCase().trim();

  const alreadyJoined = await JoinWaitlist.findOne({
    email: normalizedEmail
  });

  if (alreadyJoined) {
    return res.status(409).json({
      message: "You're already on the waitlist."
    });
  }

  await JoinWaitlist.create({
    email: normalizedEmail
  });

  return res.status(201).json({
    message: "Welcome to the waitlist. We appreciate your interest."
  });
};
