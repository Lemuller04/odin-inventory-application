const { body, validationResult } = require("express-validator");
const db = require("../db/typesQueries.js");

const validateTypes = [
  body("newtitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty."),
  body("newdescription")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty."),
];

async function typesGet(req, res, next) {
  try {
    const types = await db.getTypes();
    res.render("pages/types/index", {
      title: "Types",
      stylesheets: ["base", "item-list"],
      scripts: ["filter-list"],
      layout: "layout",
      items: types,
    });
  } catch (err) {
    next(err);
  }
}

async function typeGet(req, res, next) {
  try {
    const type = await db.getType(req.params.slug);
    res.render("pages/types/show", {
      title: "Type Details",
      stylesheets: ["base", "show-item"],
      scripts: [],
      layout: "layout",
      type: type,
    });
  } catch (err) {
    next(err);
  }
}

async function typePost(req, res, next) {
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

    const { newtitle, newdescription } = req.body;
    const slug = newtitle.toLowerCase().replace(/ /g, "-");
    await db.insertType(newtitle, newdescription, slug);
    res.redirect(`/types/${slug}`);
  } catch (err) {
    next(err);
  }
}

async function typeDelete(req, res, next) {
  try {
    await db.deleteType(req.params.slug);
    res.redirect("/types");
  } catch (err) {
    next(err);
  }
}

async function newTypeGet(req, res) {
  res.render("pages/types/new", {
    title: "Add a New Type",
    stylesheets: ["base", "forms"],
    scripts: [],
    layout: "layout",
    editing: false,
  });
}

async function typeEditGet(req, res, next) {
  try {
    const type = await db.getType(req.params.slug);

    res.render("pages/types/new", {
      title: "Edit Type",
      stylesheets: ["base", "forms"],
      scripts: [],
      layout: "layout",
      editing: true,
      data: {
        newtitle: type.title,
        newdescription: type.description,
        slug: type.slug,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function typePut(req, res, next) {
  try {
    const newSlug = req.body.newtitle.toLowerCase().replace(/ /g, "-");
    await db.updateType(req.body, req.params.slug, newSlug);
    res.redirect(`/types/${newSlug}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateTypes,
  typesGet,
  typeGet,
  typePost,
  typeDelete,
  newTypeGet,
  typeEditGet,
  typePut,
};
