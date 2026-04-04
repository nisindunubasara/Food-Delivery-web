import express from "express";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

const webhookRouter = express.Router();

webhookRouter.post("/clerk", clerkWebhooks);

export default webhookRouter;