const catchAsync = require("../utilities/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utilities/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});

// exports.getRecipe = catchAsync(async (req, res, next) => {
//     const recipe = await Recipe.findById(req.params.id);

//     if (!recipe)
//         return next(new AppError("There is no recipe with that id!", 404));

//     res.status(200).json({
//         status: "success",
//         data: {
//             recipe,
//         },
//     });
// });

// exports.updateRecipe = catchAsync(async (req, res, next) => {
//     const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     });

//     if (!recipe)
//         return next(new AppError("There is no recipe with that id!", 404));

//     res.status(200).json({
//         status: "success",
//         data: {
//             recipe,
//         },
//     });
// });

// exports.deleteRecipe = catchAsync(async (req, res, next) => {
//     const recipe = await Recipe.findByIdAndDelete(req.params.id);

//     if (!recipe)
//         return next(new AppError("There is no recipe with that id!", 404));

//     res.status(204).json({
//         status: "success",
//         data: null,
//     });
// });
