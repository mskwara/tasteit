const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

// router
//     .route("/:id")
//     .get(recipeController.getRecipe)
//     .patch(recipeController.updateRecipe)
//     .delete(recipeController.deleteRecipe);

module.exports = router;
