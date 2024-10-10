import express from "express";
import { body } from "express-validator";
import authMiddleware from '../middlewares/authMiddleware.js'
import { updateUserProfile } from "../controllers/updatesControllers.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

const updatedInfo = [
  body('firstName').optional().isString().withMessage('First name must be a string'),  body('lastName').optional().isString().withMessage('Last name must be a string'),
  body('email').optional().isEmail().withMessage('Must be a valid email'),
  body('id_card').optional().isString().withMessage('ID card must be a string'),  body('passport').optional().isString().withMessage('Passport must be a string'),
]

userRouter.put('/updateProfile', authMiddleware, updatedInfo, updateUserProfile)

userRouter.get('/admin',authMiddleware, authorizeRoles('admin'))

export default userRouter;