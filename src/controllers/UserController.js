const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");

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
                res.status(406).json({ status: "error", error: result.error});
            }
        } else {
            res.status(406).json({ status: "error", error: result.error});
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        const result = await User.delete(id);

        if (result){
            if (result.status) {
                res.status(200).json({message: "user removed"});
            } else {
                res.status(406).json(result.error);
            }
        } else {
            res.status(406).json(result.error);
        }
    }

    async recoverPassword(req, res) {
        const {email} = req.body;

        const result = await PasswordToken.create(email);

        if (result.status) {
            // Send email with token
            res.status(200).json({token: result.token});
        } else {
            res.status(406).json(result.error);
        }
    }

    async changePassword(req,res) {
        const { token, password} = req.body;
        const isTokenValid = await PasswordToken.validate(token);

        if (isTokenValid.status) {
            await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200).json({message: "Password changed"});
        } else {
            res.status(406).json({message: "Invalid token"});
        }
    }

}

module.exports = new UserController();