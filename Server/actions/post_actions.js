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
    let _upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
      },
    }).single("postImage");

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
          Message: req.file.filename,
        });
      }
    });
  } catch (error) {
    sendResponse(req, res, 200, {
      Error: error,
      Message: error.message,
    });
  }
};

const Like = (req, res) => {
  const { PostID, Title, Type } = req.body;

  const query = "CALL pr_post(?,?,?,?,?,?)";

  db.query(query, [PostID, Title, "", "", "", Type], (error, result) => {
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

const Unlike = (req, res) => {
  const { PostID, Title, Type } = req.body;

  const query = "CALL pr_post(?,?,?,?,?,?)";

  db.query(query, [PostID, Title, "", "", "", Type], (error, result) => {
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

const Share = (req, res) => {};

const GetAllPosts = async (req, res) => {
  const query = "CALL pr_post(?,?,?,?,?,?)";

  await db.query(query, ["", "", "", "", "", "Get_Post"], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, {
        Error: error,
        Message: "Query Error",
      });
    } else {
      sendResponse(req, res, 200, {
        Error: null,
        Message: result[0],
      });
    }
  });
};

const GetUserPosts = async (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_post(?,?,?,?,?,?)";

  await db.query(
    query,
    ["", "", "", id, "", "Get_User_Post"],
    (error, result) => {
      if (error) {
        sendResponse(req, res, 200, {
          Error: error,
          Message: "Query Error",
        });
      } else {
        sendResponse(req, res, 200, {
          Error: null,
          Message: result[0],
        });
      }
    }
  );
};

const HowMany = async (req, res) => {
  const { id } = req.params;
  const query = "CALL pr_post(?,?,?,?,?,?)";

  await db.query(query, ["", "", "", id, "", "How Many"], (error, result) => {
    if (error) {
      sendResponse(req, res, 200, {
        Error: error,
        Message: "Query Error",
      });
    } else {
      sendResponse(req, res, 200, {
        Error: null,
        Message: result[0],
      });
    }
  });
};

module.exports = {
  SendPost,
  Upload,
  GetAllPosts,
  Like,
  Share,
  Unlike,
  GetUserPosts,
  HowMany,
};
