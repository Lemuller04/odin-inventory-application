const express = require("express");
const router = express.Router();
const controller = require("../controllers/typesController.js");

router.get("/", controller.typesGet);
router.get("/new", controller.newTypeGet);
router.get("/:slug", controller.typeGet);
router.get("/:slug/edit", controller.typeEditGet);
router.post("/", controller.validateTypes, controller.typePost);
router.put("/:slug", controller.validateTypes, controller.typePut);
router.delete("/:slug", controller.typeDelete);

module.exports = router;
