// Always have to import express in router file again
import express from "express";
import { registerUser } from "../controller/user_controller.js";

const router = express.Router()     //through this router able to get diff routes

router.post("/register", registerUser) //(route, uss route p kya karo)

export default router