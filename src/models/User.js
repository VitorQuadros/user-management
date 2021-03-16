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

    async findByEmail(email) {
        try {
            const result = await knex.select(["id", "name", "email", "role"]).where({email}).table("users");
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

    async update(id, name, email, role) {

        const user = await this.findById(id);

        if (user) {
            const editUser = {};
            if (email) {
                if (email != user.email) {
                    const result = await this.findEmail(email);
                    if (!result) {
                        editUser.email = email;
                    } else {
                        return {status: false, error: "Email already in use"};
                    }
                } else {
                    return {status: false, error: "Email already in system"};
                }
            }

            if (name) {
                editUser.name = name;
            }

            if (role) {
                editUser.role = role;
            }

            try {
                await knex.update(editUser).where({id}).table("users");
                return {status: true};
            } catch (error) {
                return {status: false, error};
            }


        } else {
            return {status: false, error: "User does not exists"};
        }
    }

    async delete(id){
        const user = await this.findById(id);
        if (user) {
            try {
                await knex.delete().where({id}).table("users");
                return {status: true};
            } catch (error) {
                return {status: false, error};
            }
        } else {
            return {status: false, error: "User not found"};
        }
    }
}

module.exports = new User();