const pool = require("./pools.js");

async function getWeapons() {
  const result = await pool.query(
    "SELECT id, name, description, slug, category_id, type_id FROM weapons ORDER BY name",
  );
  return result.rows;
}

async function insertWeapon(title, description, slug, category, type) {
  try {
    await pool.query(
      "INSERT INTO weapons (name, description, slug, category_id, type_id) VALUES ($1, $2, $3, $4, $5)",
      [title, description, slug, category, type],
    );
  } catch (err) {
    throw new Error(`Failed to insert weapon: ${err.message}`);
  }
}

async function deleteWeapon(slug) {
  try {
    await pool.query("DELETE FROM weapons WHERE slug = $1", [slug]);
  } catch (err) {
    throw new Error(`Failed to delete weapin: ${err.message}`);
  }
}

async function getWeapon(slug) {
  try {
    const result = await pool.query(
      "SELECT id, name, description, slug, category_id, type_id FROM weapons WHERE slug = $1",
      [slug],
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(`Failed to load weapon: ${err.message}`);
  }
}

async function updateWeapon(data, slug, newSlug) {
  try {
    await pool.query(
      "UPDATE weapons SET name = $1, description = $2, slug = $3, category_id = $4, type_id = $5 WHERE slug = $6",
      [
        data.newtitle,
        data.newdescription,
        newSlug,
        data.newcategory,
        data.newtype,
        slug,
      ],
    );
  } catch (err) {
    throw new Error(`Failed to update weapon: ${err.message}`);
  }
}

module.exports = {
  getWeapons,
  insertWeapon,
  deleteWeapon,
  getWeapon,
  updateWeapon,
};
