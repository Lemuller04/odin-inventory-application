require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { join } = require("node:path");

const categoriesRouter = require("./routes/categoriesRouter.js");
const app = express();

app.use(methodOverride("_method"));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Inventory Dashboard",
    stylesheets: ["base", "index"],
    scripts: [],
    layout: "layout",
  });
});

app.use("/categories", categoriesRouter);

app.use((req, res, next) => {
  res.status(404).render("pages/404", {
    title: "404 - Page Not Found",
    stylesheets: ["base", "error"],
    scripts: [],
    layout: "layout",
  });
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(`<pre>${err.stack}</pre>`);
  } else {
    res.status(500).render("pages/500", {
      title: "500 - Internal Server Error",
      stylesheets: ["base", "error"],
      scripts: [],
      layout: "layout",
    });
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, "0.0.0.0", (err) => {
  if (err) throw err;
  console.log(`Express app listening on http://localhost:${PORT}`);
});
