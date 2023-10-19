const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
  deleteImages,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middelwares/authMiddleware");
const { uploadPhoto , blogImgResize  } = require("../middelwares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.post(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

router.put("/likes", authMiddleware, liketheBlog);
router.put("/dislikes", authMiddleware, disliketheBlog);

router.put("/:id", authMiddleware, isAdmin, updateBlog);

router.get("/:id", getBlog);
router.get("/", getAllBlogs);

router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;

























// const express = require("express");
// const router = express.Router();
// exports.router = router;
// const { authMiddleware, isAdmin } = require("../middelwares/authMiddleware");
// const { blogImgResize, uploadPhoto } = require("../middelwares/uploadImages");

// const {
//     createBlog,
//     updateBlog,
//     getBlog,
//     getAllBlogs,
//     deleteBlog,
//     likeBlog,
//     dislikeBlog,
//     uploadImages
//     }
 
//     = require("../controller/blogCtrl");

// router.put("/:id", authMiddleware, isAdmin, updateBlog);    



// router.put(
//     "/upload/:id",
//     authMiddleware,
//     isAdmin,
//     uploadPhoto.array("images", 2),
//     blogImgResize,
//     uploadImages
//   );


// router.post("/", authMiddleware, isAdmin, createBlog);
// router.put("/:id", authMiddleware, isAdmin, updateBlog);
// router.get("/:id", getBlog);
// router.get("/", getAllBlogs);
// router.delete("/:id", authMiddleware, isAdmin, deleteBlog);


// router.put("/likes", authMiddleware, likeBlog);
// router.put("/dislikes", authMiddleware, dislikeBlog);

// module.exports = router;