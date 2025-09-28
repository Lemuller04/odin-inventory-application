const pool = require("./pools.js");

async function getTypes() {
  const result = await pool.query(
    "SELECT id, title, description, slug FROM types ORDER BY title",
  );
  return result.rows;
}

async function insertType(title, description, slug) {
  try {
    await pool.query(
      "INSERT INTO types (title, description, slug) VALUES ($1, $2, $3)",
      [title, description, slug],
    );
  } catch (err) {
    throw new Error(`Failed to insert type: ${err.message}`);
  }
}

async function deleteType(slug) {
  try {
    await pool.query("DELETE FROM types WHERE slug = $1", [slug]);
  } catch (err) {
    throw new Error(`Failed to delete type: ${err.message}`);
  }
}

async function getTypeById(id) {
  try {
    const result = await pool.query(
      "SELECT id, title, description, slug FROM types WHERE id = $1",
      [id],
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to load type: ${err.message}`);
  }
}

async function getType(slug) {
  try {
    const result = await pool.query(
      "SELECT id, title, description, slug FROM types WHERE slug = $1",
      [slug],
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to load type: ${err.message}`);
  }
}

async function updateType(data, slug, newSlug) {
  try {
    await pool.query(
      "UPDATE types SET title = $1, description = $2, slug = $3 WHERE slug = $4",
      [data.newtitle, data.newdescription, newSlug, slug],
    );
  } catch (err) {
    throw new Error(`Failed to update type: ${err.message}`);
  }
}

module.exports = {
  getTypes,
  insertType,
  deleteType,
  getTypeById,
  getType,
  updateType,
};
