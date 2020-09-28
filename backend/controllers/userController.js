const catchAsync = require("../utilities/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utilities/appError");
const multer = require("multer");
const sharp = require("sharp");
const aws = require("aws-sdk");

aws.config.region = "eu-central-1";
const s3 = new aws.S3({ apiVersion: "2006-03-01" });

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

exports.addToFavourites = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
            $push: { favourites: req.params.recipeId },
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            updatedUser,
        },
    });
});

exports.deleteFromFavourites = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
            $pull: { favourites: req.params.recipeId },
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data: {
            updatedUser,
        },
    });
});

// COVER IMAGE

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            new AppError("Not an image. Please upload only images!", 400),
            false
        );
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadUserImage = upload.fields([{ name: "avatar", maxCount: 1 }]);

exports.resizeUserImage = catchAsync(async (req, res, next) => {
    // console.log(req.files.avatar);
    // console.log(req.body);

    if (!req.files.avatar) return next(); //  || !req.files.images
    // 1) Cover image
    req.body.avatar = `user-${Date.now()}-avatar.jpeg`;

    req.files.avatar[0].buffer = await sharp(req.files.avatar[0].buffer)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toBuffer();

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.body.avatar,
        Body: req.files.avatar[0].buffer,
    };

    await s3.upload(params).promise();
    if (req.user.avatar !== "default.jpg") {
        const params1 = {
            Bucket: process.env.S3_BUCKET,
            Key: req.user.avatar,
        };
        await s3.deleteObject(params1).promise();
    }

    next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError("This route is not for password updates.", 400)
        );
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!user) return next(new AppError("There is no user with that id!", 404));

    res.status(200).json({
        status: "success",
        data: {
            user,
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

// exports.deleteRecipe = catchAsync(async (req, res, next) => {
//     const recipe = await Recipe.findByIdAndDelete(req.params.id);

//     if (!recipe)
//         return next(new AppError("There is no recipe with that id!", 404));

//     res.status(204).json({
//         status: "success",
//         data: null,
//     });
// });
