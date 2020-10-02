const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utilities/appError");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
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

    createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError("Please provide email and password!", 400));

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Invalid email or password!", 401));
    }

    createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    };

    res.cookie("jwt", "loggedout", cookieOptions);

    res.status(200).json({
        status: "success",
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError(
                "You are not logged in. Please log in to get access.",
                401
            )
        );
    }
    // 2) Verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist."
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError(
    //             "User has recently changed password. Please log in again!",
    //             401
    //         )
    //     );
    // }
    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser || currentUser.changedPasswordAfter(decoded.iat)) {
                return res.status(200).json({
                    status: "fail",
                    data: {
                        user: null,
                    },
                });
            }

            // THERE IS A LOGGED IN USER
            return res.status(200).json({
                status: "success",
                data: {
                    user: currentUser,
                },
            });
        }
        return res.status(200).json({
            status: "fail",
            data: {
                user: null,
            },
        });
    } catch (err) {
        return res.status(200).json({
            status: "fail",
            data: {
                user: null,
            },
        });
    }
};
