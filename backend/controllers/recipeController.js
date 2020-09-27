const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utilities/catchAsync");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const AppError = require("../utilities/appError");
const aws = require("aws-sdk");

aws.config.region = "eu-central-1";
const s3 = new aws.S3({ apiVersion: "2006-03-01" });

exports.getAllRecipes = catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: recipes.length,
        data: {
            recipes,
        },
    });
});

exports.getUserRecipes = catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find({ user: req.params.userId }).sort({
        createdAt: -1,
    });
    const user = await User.findById(req.params.userId).select("name surname");

    res.status(200).json({
        status: "success",
        results: recipes.length,
        user,
        data: {
            recipes,
        },
    });
});

exports.getFavouriteRecipes = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const recipes = await Recipe.find({
        _id: { $in: user.favourites },
    }).sort({
        createdAt: -1,
    });

    res.status(200).json({
        status: "success",
        results: recipes.length,
        data: {
            recipes,
        },
    });
});

exports.getRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.id).populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
    });

    if (!recipe)
        return next(new AppError("There is no recipe with that id!", 404));

    res.status(200).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.updateRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!recipe)
        return next(new AppError("There is no recipe with that id!", 404));

    res.status(200).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.createRecipe = catchAsync(async (req, res, next) => {
    console.log(req.body);
    req.body.ingredients = JSON.parse(req.body.ingredients);
    req.body.steps = JSON.parse(req.body.steps);

    if (req.body.createdAt) req.body.createdAt = null;
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            recipe,
        },
    });
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe)
        return next(new AppError("There is no recipe with that id!", 404));

    res.status(204).json({
        status: "success",
        data: null,
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

exports.uploadRecipeImages = upload.fields([
    { name: "imageCover", maxCount: 1 },
]);

exports.resizeRecipeImages = catchAsync(async (req, res, next) => {
    console.log(req.files.imageCover);
    // console.log(req.body);

    if (!req.files.imageCover) return next(); //  || !req.files.images
    // 1) Cover image
    req.body.imageCover = `recipe-${Date.now()}-cover.jpeg`;

    req.files.imageCover[0].buffer = await sharp(req.files.imageCover[0].buffer)
        .resize(400, 250)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toBuffer();

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: req.body.imageCover,
        Body: req.files.imageCover[0].buffer,
    };

    await s3.upload(params).promise();

    // 2) Images
    // req.body.images = [];
    // await Promise.all(
    //     req.files.images.map(async (file, i) => {
    //         const filename = `tour-${req.params.id}-${Date.now()}-${
    //             i + 1
    //         }.jpeg`;

    //         await sharp(file.buffer)
    //             .resize(2000, 1333)
    //             .toFormat("jpeg")
    //             .jpeg({ quality: 90 })
    //             .toFile(`public/img/tours/${filename}`);

    //         req.body.images.push(filename);
    //     })
    // );

    next();
});
