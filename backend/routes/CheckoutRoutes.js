import { Router } from "express";
import express from "express";
import CheckoutController from "../Controllers/CheckoutController.js";
import { Roles } from "../constants/index.js";
import passport from "passport";
import { canAccess } from "../middlewares/canAccess.js";
const router = Router();
router.get(
	"/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.USER]),
	CheckoutController.GetCoursePurchase
);
router.post(
	"/checkout/:courseId",
	passport.authenticate("jwt", { session: false }),
	CheckoutController.checkoutCourse
);
router.post(
	"/webhook",
	express.raw({ type: "application/json" }),
	CheckoutController.stripeWebhook
);

export default router;
