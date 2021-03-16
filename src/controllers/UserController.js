const User = require("../models/User");

class UserController {

    async index(req, res) {
        const users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res) {
        const {id} = req.params;
        const user = await User.findById(id);
        if (user == undefined) {
            res.status(404).json({error: "User not found"});
        } else {
            res.status(200).json(user);
        }
    }

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

    async edit(req, res) {
        const {id, name, email, role} = req.body;
        const result = await User.update(id, name, email, role);
        if (result) {
            if (result.status) {
                res.status(200).json({ status: "updated successfully"});
            } else {
                res.status(406).json({ status: "error", error: "update failed"});
            }
        } else {
            res.status(406).json({ status: "error", error: "update failed"});
        }
    }
}

module.exports = new UserController();