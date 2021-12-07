// Import packages
const sendResponse = require("../responses/res_handler");
const multer = require("multer");

// Image Uplaod Import
const storage = require("../Extra/image_uplaod");

// Import mysql Config file
const db = require("../mysql/config");

const SendPost = (req, res) => {
  const { Title, Image, UserID, Date, Type } = req.body;

  const query = "CALL pr_post(?,?,?,?,?,?)";

  db.query(query, ["", Title, Image, UserID, Date, Type], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, {
        Error: error,
        Message: "Query Error",
      });
    } else {
      sendResponse(req, res, 200, {
        Error: null,
        Message: result[0][0].Message,
      });
    }
  });
};

const Upload = (req, res) => {
  try {
    let _upload = multer({ storage: storage }).single("postImage");
    _upload(req, res, (err) => {
      // Check if the image is been uploaded successfully
      if (!req.file) {
        sendResponse(req, res, 200, {
          Error: "Image Error",
          Message: "Please make sure you selected an image",
        });
      } else if (err instanceof multer.MulterError) {
        sendResponse(req, res, 200, {
          Error: err,
          Message: "Package ( Multer Error )",
        });
      } else if (err) {
        sendResponse(req, res, 200, {
          Error: err,
          Message: "Image didn't uploaded",
        });
      } else {
        sendResponse(req, res, 200, {
          Error: null,
          Message: "Image uploaded successfully",
        });
      }
    });
  } catch (error) {
    sendResponse(req, res, 200, {
      Error: error,
      Message: "CacheError",
    });
  }
};

const GetPosts = (req, res) => {
  const { Type } = req.body;

  const query = "CALL pr_post(?,?,?,?,?,?)";

  db.query(query, ["", "", "", "", "", Type], (error, result, fields) => {
    if (error) {
      sendResponse(req, res, 200, {
        Error: error,
        Message: "Query Error",
      });
    } else {
      sendResponse(req, res, 200, {
        Error: null,
        Message: result,
      });
    }
  });
};

module.exports = { SendPost, Upload, GetPosts };
