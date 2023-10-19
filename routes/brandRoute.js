const express = require("express");
const router = express.Router();
exports.router = router;
const { authMiddleware, isAdmin } = require("../middelwares/authMiddleware");


const {
    createBrand,
    updateBrand,
    getBrand,
    getallBrands,
    deleteBrand
    }
 
    = require("../controller/brandCtrl");

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.get("/:id", getBrand);
router.get("/", getallBrands);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);


module.exports = router;