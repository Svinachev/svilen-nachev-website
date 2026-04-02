import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeInput = (value: string) => value.replace(/\s+/g, " ").trim();

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const body = req.body as ContactRequest;

    const name = normalizeInput(body.name ?? "");
    const email = normalizeInput(body.email ?? "").toLowerCase();
    const message = normalizeInput(body.message ?? "");
    const website = normalizeInput(body.website ?? "");

    if (website.length > 0) {
      return res.json({
        success: true,
        message: "Message submitted successfully.",
      } as ContactResponse);
    }

    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 120 characters.",
      } as ContactResponse);
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      } as ContactResponse);
    }

    if (message.length < 10 || message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 2000 characters.",
      } as ContactResponse);
    }

    console.log("Contact message received", {
      name,
      email,
      submittedAt: body.submittedAt,
      messageLength: message.length,
    });

    return res.json({
      success: true,
      message: "Thank you! Your message has been sent.",
    } as ContactResponse);
  } catch (error) {
    console.error("Contact endpoint error", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message right now. Please try again.",
    } as ContactResponse);
  }
};
