class UserController {

    async index(req, res) {}

    async create(req, res) {

        const { email, name, password } = req.body;

        if(email == undefined) {
            res.status(400).json({ error: "Missing email"});
        }

        if(password == undefined) {
            res.status(400).json({ error: "Missing password"});
        }

        res.status(200).send("Ok");
    }
}

module.exports = new UserController();