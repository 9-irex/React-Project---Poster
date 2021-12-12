const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
  destination: path.join(
    __dirname,
    "../../Client/poster_app/public/Images/",
    "Uploads"
  ),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-_-_-" + file.originalname);
  },
});

module.exports = storage;
