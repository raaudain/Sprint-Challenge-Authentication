const db = require("../database/dbConfig");

function addUser(user){
    return db("users")
        .insert(user, "id")
        .then(ids => {
            console.log(ids);
            const [id] = ids;
            console.log([id]);
            return db("users")
                .where({id})
                .first();
        })
}

function findUser(user){
    return db("users").where(user);
}

module.exports = {addUser, findUser}