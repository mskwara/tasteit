export function setRoute(link, params) {
    if (this.$route.name != link) {
        this.$router.push({ name: link, params: params });
    }
}

export function replaceRoute(link, params) {
    this.$router.replace({ name: link, params: params });
}

export function formatSecToTime(sec) {
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
}

export function clearUserData(userdata) {
    userdata.id = null;
    userdata.name = "";
    userdata.surname = "";
    userdata.avatar = "";
    userdata.favourites = [];
}

export function validateIngredients(recipe) {
    let result = {
        status: "success",
        error: null
    };
    if (recipe.name.length == 0 || recipe.name === "Untitled") {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle1"),
            content: this.$t("validateContent1")
        };
    } else if (recipe.ingredients.length == 0) {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle2"),
            content: this.$t("validateContent2")
        };
    } else if (recipe.portion === "") {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle3"),
            content: this.$t("validateContent3")
        };
    }
    return result;
}

export function validateInfo(recipe) {
    let result = {
        status: "success",
        error: null
    };
    if (recipe.shortDescription.length == 0) {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle4"),
            content: this.$t("validateContent4")
        };
    } else if (
        recipe.preparationTime === null ||
        recipe.preparationTime.length == 0 ||
        /^\d+$/.test(recipe.preparationTime) === false
    ) {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle5"),
            content: this.$t("validateContent5")
        };
    } else if (recipe.difficulty === "" || recipe.difficulty === "none") {
        result.status = "fail";
        result.error = {
            title: this.$t("validateTitle6"),
            content: this.$t("validateContent6")
        };
    }
    return result;
}

export async function getPhotoFromAWS(key) {
    const encode = data => {
        const buf = Buffer.from(data);
        const base64 = buf.toString("base64");
        return base64;
    };

    const aws = require("aws-sdk");
    aws.config.region = "eu-central-1";

    const s3 = new aws.S3({
        apiVersion: "2006-03-01",
        accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY
    });

    const params = {
        Bucket: process.env.VUE_APP_S3_BUCKET,
        Key: key
    };
    const data = await s3.getObject(params).promise();
    const encoded = encode(data.Body);
    const photo = `data:image/jpeg;base64,${encoded}`;
    // func(photo);
    return photo;
}
