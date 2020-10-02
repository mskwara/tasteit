const catchAsync = require("../utilities/catchAsync");
const Review = require("../models/reviewModel");
const AppError = require("../utilities/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    if (req.body.createdAt) req.body.createdAt = null;
    const review = await Review.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            review,
        },
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    if (
        req.user._id.toString() !== req.body.reviewAuthorId.toString() &&
        req.user.role !== "admin"
    ) {
        return next(
            new AppError("You have no permission to delete this review.", 400)
        );
    }

    await Review.findOneAndDelete({ _id: req.params.reviewId });
    res.status(204).json({
        status: "success",
    });
});
