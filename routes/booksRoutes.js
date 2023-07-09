const express = require("express");

const bookCtrl = require("../controllers/book");

const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config");

const router = express.Router();



router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRating);

router.post("/", auth, multer, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, bookCtrl.modifyBook);

router.delete("/:id", auth, bookCtrl.deleteBook);



module.exports = router;