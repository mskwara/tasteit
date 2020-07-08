const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
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
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        avgRating: {
            type: Number,
            min: 1,
            max: 5,
            set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Recipe must belong to a user"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual populate
recipeSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "recipe",
    localField: "_id",
});

recipeSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name surname avatar",
    });
    next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
