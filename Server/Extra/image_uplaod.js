const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

var storage = multer.diskStorage({
  destination: path.join(
    __dirname,
    "../../Client/poster_app/public/Images/",
    "Uploads"
  ),
  filename: function (req, file, cb) {
    cb(
      null,
      uuidv4() + "-" + file.originalname.toLowerCase().split(" ").join("-")
    );
  },
});

module.exports = storage;
