// Always have to import express in router file again
import express from "express";
import { registerUser } from "../controller/User_controller";

const router = express.Router()     //through this router able to get diff routes

router.get("/register", registerUser)

export default router