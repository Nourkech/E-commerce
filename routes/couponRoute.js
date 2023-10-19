const express = require("express");
const router = express.Router();
exports.router = router;
const { authMiddleware, isAdmin } = require("../middelwares/authMiddleware");


const {
    createCoupon,
    updateCoupon,
    getCoupon,
    getAllCoupons,
    deleteCoupon
    }
 
    = require("../controller/couponCtrl");

router.post("/", authMiddleware, isAdmin, createCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.get("/:id", getCoupon);
router.get("/", getAllCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);


module.exports = router;