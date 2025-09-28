const { body, validationResult } = require("express-validator");
const db = require("../db/weaponsQueries.js");
const categoriesDb = require("../db/categoriesQueries.js");
const typesDb = require("../db/typesQueries.js");

const validateWeapons = [
  body("newtitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty."),
  body("newdescription")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty."),
];

async function weaponsGet(req, res, next) {
  try {
    const weapons = await db.getWeapons();
    const categories = await categoriesDb.getCategories();
    const types = await typesDb.getTypes();

    res.render("pages/weapons/index", {
      title: "Weapons",
      stylesheets: ["base", "item-list"],
      scripts: ["filter-list"],
      layout: "layout",
      items: weapons,
      categories: categories,
      types: types,
    });
  } catch (err) {
    next(err);
  }
}

async function weaponGet(req, res, next) {
  try {
    const weapon = await db.getWeapon(req.params.slug);
    const category = await categoriesDb.getCategoryById(weapon.category_id);
    const type = await typesDb.getTypeById(weapon.type_id);

    res.render("pages/weapons/show", {
      title: "Weapon Details",
      stylesheets: ["base", "show-item"],
      scripts: [],
      layout: "layout",
      weapon: weapon,
      category: category,
      type: type,
    });
  } catch (err) {
    next(err);
  }
}

async function weaponPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("pages/types/new", {
        title: "New Type",
        stylesheets: ["base", "forms"],
        scripts: [],
        layout: "layout",
        data: req.body,
        errors: errors.array(),
        editing: false,
      });
    }

    const { newtitle, newdescription, newcategory, newtype } = req.body;
    const slug = newtitle.toLowerCase().replace(/ /g, "-");
    await db.insertWeapon(newtitle, newdescription, slug, newcategory, newtype);
    res.redirect("/weapons");
    // res.redirect(`/weapons/${slug}`);
  } catch (err) {
    next(err);
  }
}

async function weaponDelete(req, res, next) {
  try {
    await db.deleteWeapon(req.params.slug);
    res.redirect("/weapons");
  } catch (err) {
    next(err);
  }
}

async function newWeaponGet(req, res, next) {
  try {
    const categories = await categoriesDb.getCategories();
    const types = await typesDb.getTypes();

    res.render("pages/weapons/new", {
      title: "Add a New Weapon",
      stylesheets: ["base", "forms"],
      scripts: [],
      layout: "layout",
      editing: false,
      categories: categories,
      types: types,
    });
  } catch (err) {
    next(err);
  }
}

async function weaponEditGet(req, res, next) {
  try {
    const weapon = await db.getWeapon(req.params.slug);
    const category = await categoriesDb.getCategoryById(weapon.category_id);
    const type = await typesDb.getTypeById(weapon.type_id);
    const categories = await categoriesDb.getCategories();
    const types = await typesDb.getTypes();

    res.render("pages/weapons/new", {
      title: "Edit Type",
      stylesheets: ["base", "forms"],
      scripts: [],
      layout: "layout",
      editing: true,
      data: {
        newtitle: weapon.name,
        newdescription: weapon.description,
        slug: weapon.slug,
      },
      weapon: weapon,
      categories: categories,
      types: types,
    });
  } catch (err) {
    next(err);
  }
}

async function weaponPut(req, res, next) {
  try {
    const newSlug = req.body.newtitle.toLowerCase().replace(/ /g, "-");
    await db.updateWeapon(req.body, req.params.slug, newSlug);
    res.redirect(`/weapons/${newSlug}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateWeapons,
  weaponsGet,
  weaponGet,
  weaponPost,
  weaponDelete,
  newWeaponGet,
  weaponEditGet,
  weaponPut,
};
