const express = require("express");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(
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
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;
