const jwt = require("jsonwebtoken");
const secret = "asdasddasad24252adasdasdasdjmai2dmna289348a92n3a89in3a2";

module.exports = function(req,res,next) {
    const authToken = req.headers["authorization"];

    if(authToken) {
        const bearer = authToken.split(" ");
        const token = bearer[1];
        try {
            const decoded = jwt.verify(token, secret);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(403).json({error: "You're not an administrator"});
            }
        } catch (error) {
            res.status(403).json({error: "Not authenticated"});
        }

    } else {
        res.status(403).json({error: "Not authenticated"});
    }
};