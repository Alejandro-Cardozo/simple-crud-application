const router = require("express").Router();

const File = require("../models/File");

router.get("/profile/add", (req, res) => {
  res.render("files/new-file");
});

router.post("/profile/new-file", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title." });
  }
  if (!description) {
    errors.push({ text: "Please write a description." });
  }
  if (errors.length > 0) {
    res.render("files/new-file", {
      errors,
      title,
      description
    });
  } else {
    const newFile = new File({ title, description });
    await newFile.save();
    req.flash("success_msg", "File added successfully");
    res.redirect("/profile");
  }
});

router.get("/profile", async (req, res) => {
  const files = await File.find().sort({ date: "desc" });
  res.render("files/all-files", { files });
});

router.get("/profile/edit/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  res.render("files/edit-file", { file });
});

router.put("/profile/edit-file/:id", async (req, res) => {
  const { title, description } = req.body;
  await File.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "File updated");
  res.redirect("/profile");
});

router.delete("/profile/delete/:id", async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "File deleted");
  res.redirect("/profile");
});
module.exports = router;
