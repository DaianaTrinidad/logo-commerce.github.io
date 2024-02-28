const fs = require("fs")

module.exports = {
    fileName: "./src/data/users.json",

    generateID: function () {
        let allUsers = this.findAllUsers()
        let ultimoUsuario = allUsers.pop()
        if(ultimoUsuario){
            return ultimoUsuario.id + 1
        }
        return 1
    },

    findAllUsers: function() {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"))
    },

    findByPk: function(id){
        let allUsers = this.findAllUsers();
        let userFound = allUsers.find(user => user.id === id);
        return userFound
    },

    findByField: function(field, text) {
        let users = this.findAllUsers()
        let userFound = users.find(user => user[field] === text)
        return userFound
    },

    create: function (userData) {
        let allUsers = this.findAllUsers()
        let nuevoUsuario = {
            id: this.generateID(),
            ...userData
        }

        allUsers.push(nuevoUsuario)

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "))
        
        return(nuevoUsuario)
    }
}

