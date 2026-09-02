const express = require("express");
const router = express.Router();

const {
    contact,
    getContacts,
    deleteContact,
} = require("../controllers/contactController");

const { verifyToken } = require("../middleware/authMiddleware");

// Public route
router.post("/", contact);

// Protected routes
router.get("/", verifyToken, getContacts);
router.delete("/:id", verifyToken, deleteContact);

module.exports = router;