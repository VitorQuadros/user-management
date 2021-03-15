const User = require("../models/User");

class UserController {

    async index(req, res) {}

    async create(req, res) {

        const { email, name, password } = req.body;

        if(email == undefined) {
            res.status(400).json({ error: "Missing email"});
            return;
        }

        if(password == undefined) {
            res.status(400).json({ error: "Missing password"});
            return;
        }


        const emailExists =  await User.findEmail(email);

        if (emailExists) {
            res.status(406).json({error: "Email already in system"});
            return;
        }

        await User.new(email, password, name);



        res.status(200).send("Ok");
    }
}

module.exports = new UserController();