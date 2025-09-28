const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoriesController.js");

router.get("/", controller.categoriesGet);
router.get("/new", controller.newCategoryGet);
router.get("/:slug", controller.categoryGet);
router.get("/:slug/edit", controller.categoryEditGet);
router.post("/", controller.validateCategory, controller.categoryPost);
router.put("/:slug", controller.validateCategory, controller.categoryPut);
router.delete("/:slug", controller.categoryDelete);

module.exports = router;
