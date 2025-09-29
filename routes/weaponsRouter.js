const express = require("express");
const router = express.Router();
const controller = require("../controllers/weaponsController.js");
const requireAdmin = require("../middleware/requireAdmin.js");

router.get("/", controller.weaponsGet);
router.get("/new", controller.newWeaponGet);
router.get("/:slug", controller.weaponGet);
router.get("/:slug/edit", controller.weaponEditGet);
router.post("/", controller.validateWeapons, controller.weaponPost);
router.put("/:slug", controller.validateWeapons, controller.weaponPut);
router.delete("/:slug", controller.weaponDelete);

module.exports = router;
