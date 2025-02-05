

import express from "express";

import { verifyUser } from "../utils/verifyToken.js";
import { createBooking, getALLBooking, getBooking } from "../controllers/bookingController.js";

const router = express.Router()

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyUser, getALLBooking);

export default router;