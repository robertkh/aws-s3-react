//?
import { gl } from "../util/logger.js";
import express from "express";
var userRouter = express.Router();

//todo - signup
import {
  signupValidator,
  signupValidationResult,
} from "../middleware/user/signupValidator.js";
import { postUserSignup } from "../routers/signupRouter.js";
import sendSignupMail from "../middleware/user/sendSignupMail.js";
userRouter.post(
  "/signup",
  signupValidator,
  signupValidationResult,
  postUserSignup,
  sendSignupMail
);

//todo - login
import {
  loginValidator,
  loginValidationResult,
} from "../middleware/user/loginValidator.js";
import { postUserLogin } from "../routers/loginRouter.js";
userRouter.post("/login", loginValidator, loginValidationResult, postUserLogin);

//todo - logout
import { getUsersLogout } from "../routers/logoutRouter.js";
userRouter.get("/logout", getUsersLogout);

//todo - reset
import {
  resetValidator,
  resetValidationResult,
} from "../middleware/user/resetValidator.js";
import { resetLink } from "../routers/resetRouter.js";
import sendResetMail from "../middleware/user/sendResetMail.js";
userRouter.post(
  "/reset",
  resetValidator,
  resetValidationResult,
  resetLink,
  sendResetMail
);

//todo - setNewPassword
import { setNewPassword } from "../routers/emailPassword.js";
userRouter.get("/setnewpass/:id", setNewPassword);

//todo - checkAuth
import checkAuth from "../middleware/user/checkAuth.js";
userRouter.get("/admin", checkAuth, (req, res) => {
  gl.log("lav a");
  res.json("lav a");
});

//todo - getUserName
import { getUserName } from "../routers/avatarRouter.js";
userRouter.get("/name", getUserName);

//todo
import { getUserActive } from "../routers/emailActive.js";
userRouter.get("/:id", getUserActive);

//todo
export default userRouter;
