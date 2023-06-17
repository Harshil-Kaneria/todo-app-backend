let isLoggedIn = (req, res, next) => {
    if (true) {
        console.log("User is LoggedIn");
        next();
    } else {
        res.send("Sorry Something Went Wrong !");
    }
}

module.exports = isLoggedIn