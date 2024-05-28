import express from "express";
import {
  signUpValidationRules,
  signInValidationRules,
} from "../application/validators/auth.validator.js";
import AuthController from "../controllers/auth.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/signup", signUpValidationRules(), AuthController.signUp);
router.post("/signin", signInValidationRules(), AuthController.signIn);
router.get("/check-token", authenticate, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

export default router;
