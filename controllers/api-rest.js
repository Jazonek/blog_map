const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/db.json");
const db = low(adapter);

exports.fetchAllImages = async (req, res) => {
  const urls = await db.get("images").value();
  res.send(urls);
};
exports.fetchMarkerInfo = async (req, res) => {
  const posts = await db.get("posts").value();
  res.send(posts);
};
