function requireAdmin(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (req.body.adminPassword === adminPassword) {
    return next();
  }

  res.status(403).render("pages/403", {
    title: "Forbidden",
    stylesheets: ["base", "error"],
    layout: "layout",
    message: "Invalid admin password. Action not allowed.",
  });
}

module.exports = requireAdmin;
