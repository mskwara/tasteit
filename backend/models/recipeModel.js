const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A recipe must have a name!"],
        trim: true,
        minlength: [4, "Name must have more or equal than 4 characters!"],
        maxlength: [40, "Name must have less than 40 characters!"],
    },
    preparationTime: {
        type: String,
        required: [true, "A recipe must have a preparation time!"],
    },
    difficulty: {
        type: String,
        required: [true, "A recipe must have difficulty set!"],
        enum: ["easy", "medium", "difficult"],
    },
    shortDescription: {
        type: String,
        maxlength: [
            240,
            "Short desciption must have less or equal than 240 characters",
        ],
    },
    type: {
        type: String,
        enum: ["meat", "snack", "cake", "salad"],
    },
    portion: String,
    ingredients: [
        {
            name: String,
            optional: {
                type: Boolean,
                default: false,
            },
        },
    ],
    steps: [
        {
            before: String,
            content: String,
            time: Number,
            optional: Boolean,
        },
    ],
    imageCover: String,
    images: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
