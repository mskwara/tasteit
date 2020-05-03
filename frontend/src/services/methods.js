exports.setRoute = function(link, params) {
    this.$router.push({ name: link, params: params });
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
