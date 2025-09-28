const pool = require("./pools.js");

async function getCategories() {
  const result = await pool.query(
    "SELECT id, title, description, slug FROM categories",
  );
  return result.rows;
}

async function insertCategory(title, description, slug) {
  try {
    await pool.query(
      "INSERT INTO categories (title, description, slug) VALUES ($1, $2, $3)",
      [title, description, slug],
    );
  } catch (err) {
    throw new Error(`Failed to insert category: ${err.message}`);
  }
}

async function deleteCategory(slug) {
  try {
    await pool.query("DELETE FROM categories WHERE slug = $1", [slug]);
  } catch (err) {
    throw new Error(`Failed to delete category ${err.message}`);
  }
}

async function getCategory(slug) {
  try {
    const result = await pool.query(
      "SELECT id, title, description, slug FROM categories WHERE slug = $1",
      [slug],
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to load category: ${err.message}`);
  }
}

async function updateCategory(data, slug, newSlug) {
  try {
    await pool.query(
      "UPDATE categories SET title = $1, description = $2, slug = $3 WHERE slug = $4",
      [data.newtitle, data.newdescription, newSlug, slug],
    );
  } catch (err) {
    throw new Error(`Failed to update category: ${err.message}`);
  }
}

module.exports = {
  getCategories,
  insertCategory,
  deleteCategory,
  getCategory,
  updateCategory,
};
