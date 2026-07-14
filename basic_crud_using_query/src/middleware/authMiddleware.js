const authMiddleware = async (req, res, next) => {
    const password = req.headers['password'];
    if (!password) {
        return res.status(400).send("password required");
    } else if (password !== "dharanI") {
        return res.status(400).send("password mismatched");
    }
    next();
}

module.exports = authMiddleware;