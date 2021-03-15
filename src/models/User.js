const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {

    async findAll(){
        try {
            const result = await knex.select(["id", "name", "email", "role"]).table("users");
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({id}).table("users");
            if (result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }


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