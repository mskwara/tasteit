const mongoose = require("mongoose");
const Recipe = require("./recipeModel");

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
reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: "user",
        select: "name surname avatar",
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function(recipeId) {
    const stats = await this.aggregate([
        {
            $match: { recipe: recipeId },
        },
        {
            $group: {
                _id: "$recipe",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);
    // console.log(stats);

    if (stats.length > 0) {
        await Recipe.findByIdAndUpdate(recipeId, {
            ratingsQuantity: stats[0].nRating,
            avgRating: stats[0].avgRating,
        });
    } else {
        await Recipe.findByIdAndUpdate(recipeId, {
            ratingsQuantity: 0,
            ratingsAverage: 0,
        });
    }
};

reviewSchema.post("save", function() {
    // this points to current review
    this.constructor.calcAverageRatings(this.recipe);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.rev = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    await this.rev.constructor.calcAverageRatings(this.rev.recipe);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
