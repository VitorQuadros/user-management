const knex = require("../database/connection");
const User = require("./User");

class PasswordToken {

    async create(email) {
        const user = await User.findByEmail(email);
        if(user) {
            try {
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: Date.now()
                }).table("passwordtokens");

                return { status: true };
            } catch (error) {
                return {status: false, error: error};
            }

        } else {
            return {status: false, error: "User does not exists"};
        }
    }

}

module.exports = new PasswordToken();