const express = require("express");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(
        authController.protect,
        recipeController.uploadRecipeImages,
        recipeController.resizeRecipeImages,
        recipeController.createRecipe
    );

router.route("/user/:userId").get(recipeController.getUserRecipes);
router
    .route("/favourites/user/:userId")
    .get(recipeController.getFavouriteRecipes);

router
    .route("/:id")
    .get(recipeController.getRecipe)
    .patch(authController.protect, recipeController.updateRecipe)
    .delete(authController.protect, recipeController.deleteRecipe);

module.exports = router;
