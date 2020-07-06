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
