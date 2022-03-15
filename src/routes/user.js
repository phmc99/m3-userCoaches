import { Router } from "express";
import UserControllers from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router()

userRouter.post("", (req,res) => UserControllers.createUser(req,res))
userRouter.post("/login", (req,res) => UserControllers.login(req,res))
userRouter.get("", (req,res, next) =>  isAuthenticated(req,res, next), (req,res) => UserControllers.findAll(req,res))
userRouter.get("/:id", (req,res) => UserControllers.findOne(req,res))
userRouter.patch("/:id", (req,res) => UserControllers.updateUser(req,res))
userRouter.delete("/:id", (req,res) => UserControllers.deleteUser(req,res))

export default userRouter