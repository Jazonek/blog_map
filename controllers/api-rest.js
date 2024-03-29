const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

exports.posts = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const posts = await db.get("posts").value();
  res.send(posts);
};
exports.fetchAllImages = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const urls = await db.get("images").value();
  res.send(urls);
};
exports.fetchMarkerInfo = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { id } = req.params;
  const posts = await db
    .get("posts")
    .find({ id: id })
    .value();
  res.send(posts);
};
exports.markerComment = async (req, res) => {
  const adapter = new FileSync("./data/db.json");
  const db = low(adapter);
  const { id } = req.params;
  const comments = await db
    .get("comments")
    .filter({ postId: id })
    .value();
  if (!comments) {
    return res.send(JSON.stringify(0));
  } else {
    return res.send(comments);
  }
};
