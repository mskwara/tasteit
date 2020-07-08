exports.setRoute = function(link, params) {
    if (this.$route.name != link) {
        this.$router.push({ name: link, params: params });
    }
};

exports.replaceRoute = function(link, params) {
    this.$router.replace({ name: link, params: params });
};

exports.formatSecToTime = sec => {
    let result = "";
    if (sec == 0) {
        return "END";
    }
    if (sec / 3600 >= 1) {
        result += parseInt(sec / 3600) + "h ";
        sec = sec % 3600;
    }
    if (sec / 60 >= 1) {
        result += parseInt(sec / 60) + "min ";
        sec = sec % 60;
    }
    if (sec != 0) {
        result += sec + "s";
    }
    return result;
};

exports.clearUserData = userdata => {
    userdata.id = null;
    userdata.name = "";
    userdata.surname = "";
    userdata.avatar = "";
    userdata.favourites = [];
};

exports.validateIngredients = recipe => {
    let result = {
        status: "success",
        error: null
    };
    if (recipe.name.length == 0 || recipe.name === "Untitled") {
        result.status = "fail";
        result.error = {
            title: "Recipe is untitled...",
            content: "Please provide recipe's title by clicking it."
        };
    } else if (recipe.ingredients.length == 0) {
        result.status = "fail";
        result.error = {
            title: "Empty ingredients list",
            content: "Please add necessary ingredients."
        };
    } else if (recipe.portion === "") {
        result.status = "fail";
        result.error = {
            title: "Unspecified number of servings",
            content: "Please set amount of portions."
        };
    }
    return result;
};

exports.validateInfo = recipe => {
    let result = {
        status: "success",
        error: null
    };
    if (recipe.shortDescription.length == 0) {
        result.status = "fail";
        result.error = {
            title: "The description is empty",
            content: "Please provide recipe's description."
        };
    } else if (
        recipe.preparationTime === null ||
        recipe.preparationTime.length == 0 ||
        /^\d+$/.test(recipe.preparationTime) === false
    ) {
        result.status = "fail";
        result.error = {
            title: "Invalid preparation time",
            content: "Please specify preparation time as number of minutes."
        };
    } else if (recipe.difficulty === "" || recipe.difficulty === "none") {
        result.status = "fail";
        result.error = {
            title: "Unspecified recipe's difficulty",
            content: "Please select recipe's difficulty."
        };
    }
    return result;
};
