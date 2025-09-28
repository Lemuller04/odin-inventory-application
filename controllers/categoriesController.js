const { body, validationResult } = require("express-validator");
const db = require("../db/categoriesQueries.js");

const validateCategory = [
  body("newtitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title cannot be empty."),
  body("newdescription")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description cannot be empty."),
];

async function categoriesGet(req, res, next) {
  try {
    const categories = await db.getCategories();
    res.render("pages/categories/index", {
      title: "Categories",
      stylesheets: ["base", "item-list"],
      scripts: ["filter-list"],
      layout: "layout",
      items: categories,
    });
  } catch (err) {
    next(err);
  }
}

async function categoryGet(req, res, next) {
  try {
    const category = await db.getCategory(req.params.slug);
    res.render("pages/categories/show", {
      title: "Category Details",
      stylesheets: ["base"],
      scripts: [],
      layout: "layout",
      category: category,
    });
  } catch (err) {
    next(err);
  }
}

async function categoryPost(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("pages/categories/new", {
        title: "New Category",
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
    await db.insertCategory(newtitle, newdescription, slug);
    res.redirect(`/categories/${slug}`);
  } catch (err) {
    next(err);
  }
}

async function categoryDelete(req, res, next) {
  try {
    await db.deleteCategory(req.params.slug);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
}

async function newCategoryGet(req, res) {
  res.render("pages/categories/new", {
    title: "Add a New Category",
    stylesheets: ["base", "forms"],
    scripts: [],
    layout: "layout",
    editing: false,
  });
}

async function categoryEditGet(req, res, next) {
  try {
    const category = await db.getCategory(req.params.slug);

    res.render("pages/categories/new", {
      title: "Edit Category",
      stylesheets: ["base", "forms"],
      scripts: [],
      layout: "layout",
      editing: true,
      data: {
        newtitle: category.title,
        newdescription: category.description,
        slug: category.slug,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function categoryPut(req, res, next) {
  try {
    const newSlug = req.body.newtitle.toLowerCase().replace(/ /g, "-");
    await db.updateCategory(req.body, req.params.slug, newSlug);
    res.redirect(`/categories/${newSlug}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateCategory,
  categoriesGet,
  categoryGet,
  categoryPost,
  categoryDelete,
  newCategoryGet,
  categoryEditGet,
  categoryPut,
};
