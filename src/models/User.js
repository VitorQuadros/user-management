const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {

    async new(email, password, name){
        try {
            const hash = await bcrypt.hash(password, 10);

            await knex.insert({email, password: hash, name, role: 0}).table("users");
        } catch (error) {
            console.log(error);
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select("*").from("users").where({email});

            if (result.length > 0) return true;
        } catch (error) {
            console.log(error);
            return false;
        }

    }

}

module.exports = new User();