const router = require("express").Router();

router.get("/profile", (req, res) => {
  res.send("notes from DB");
});

module.exports = router;
