const router = require("express").Router();
const upload = require("../middlewares/file_upload");

router.post("/single", upload.single("image"), async function (req, res) {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.json({ success: false, error: "file-not-uploaded" });
  }

  res.json({
    success: true,
    data: "http://localhost:5000/" + uploadedFile.filename,
  });
});

router.post("/multiple", upload.array("images", 10), async function (req, res) {
  const uploadedFiles = req.files;
  if (!uploadedFiles || uploadedFiles.length == 0) {
    return res.json({ success: false, error: "files-not-uploaded" });
  }

  var downloadUrls = [];
  uploadedFiles.forEach(function (uploadedFile) {
    const downloadUrl = "http://localhost:5000/" + uploadedFile.filename;
    downloadUrls.push(downloadUrl);
  });
  res.json({ success: true, data: downloadUrls });
});

module.exports = router;
