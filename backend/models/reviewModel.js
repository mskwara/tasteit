const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user"],
    },
    recipe: {
        type: mongoose.Schema.ObjectId,
        ref: "Recipe",
        required: [true, "Review must belong to a recipe"],
    },
    content: {
        type: String,
        required: [true, "A review must have the content!"],
        trim: true,
        maxlength: [
            600,
            "There is more than 600 characters in the review content",
        ],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Virtual populate
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name surname avatar",
    });
    next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
