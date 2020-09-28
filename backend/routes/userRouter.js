const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/signup")
    .post(
        userController.uploadUserImage,
        userController.resizeUserImage,
        authController.signup
    );
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("/isloggedin").get(authController.isLoggedIn);

router.use(authController.protect);

router.route("/").get(userController.getAllUsers);

router
    .route("/:id")
    .patch(
        userController.uploadUserImage,
        userController.resizeUserImage,
        userController.updateUser
    );

router
    .route("/:userId/favourites/:recipeId")
    .post(userController.addToFavourites)
    .delete(userController.deleteFromFavourites);

// router
//     .route("/:id")
//     .get(recipeController.getRecipe)
//     .patch(recipeController.updateRecipe)
//     .delete(recipeController.deleteRecipe);

module.exports = router;
