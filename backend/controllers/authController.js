const jwt = require("jsonwebtoken");
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utilities/appError");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError("Please provide email and password!", 400));

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Invalid email or password!", 401));
    }

    createSendToken(user, 200, res);
});
