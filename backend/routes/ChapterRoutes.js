import { Router } from "express";
import ChapterController from "../Controllers/ChapterController.js";
import chapterValidator from "../validators/chapter-validator.js";
import { upload } from "../middlewares/multer.js";
import passport from "passport";
import { canAccess } from "../middlewares/canAccess.js";
import { Roles } from "../constants/index.js";
const router = Router();
router.get(
	"/:chapterId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	ChapterController.getChapter
);

router.get(
	"/get-progress/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.USER]),
	ChapterController.getProgress
);
router.post(
	"/create/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	chapterValidator,
	ChapterController.createChapter
);
router.patch(
	"/update/:chapterId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	// upload.single("video"),
	ChapterController.updateChapter
);
router.patch(
	"/reorder/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	ChapterController.reorderChapter
);
router.put(
	"/publish/:chapterId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	ChapterController.publishChapter
);
router.put(
	"/unpublish/:chapterId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	ChapterController.unPublishChapter
);
router.delete("/delete/:chapterId", ChapterController.deleteChapter);
router.post(
	"/attachment",
	upload.single("file"),
	ChapterController.addAttachment
);
router.delete("/attachment/:attachmentId", ChapterController.deleteAttachment);
router.post("/progress/:chapterId", ChapterController.updateUserProgress);
router.delete(
	"/:chapterId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	ChapterController.deleteChapter
);
router.post(
	"/upload-video",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.CREATOR]),
	upload.single("video"),
	ChapterController.uploadVideo
);
router.get(
	"/:chapterId/:courseId",
	passport.authenticate("jwt", { session: false }),
	canAccess([Roles.USER]),
	ChapterController.getUserChapter
);

export default router;
