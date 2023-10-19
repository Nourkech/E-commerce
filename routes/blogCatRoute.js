const express = require("express");
const router = express.Router();
exports.router = router;
const { authMiddleware, isAdmin } = require("../middelwares/authMiddleware");

const {
    createBlogCategory,
    updateBlogCategory,
    getBlogCategory,
    getallBlogCategory,
    deleteBlogCategory
    }
 
    = require("../controller/blogCatCtrl");

router.post("/", authMiddleware, isAdmin, createBlogCategory);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategory);
router.get("/:id", getBlogCategory);
router.get("/", getallBlogCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategory);

module.exports = router;