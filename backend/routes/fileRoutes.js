import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadProfilePicture } from "../controllers/fileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const fileRouter = express.Router();

fileRouter.post('/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), uploadProfilePicture);

export default fileRouter;