const { Users } = require("../database/models");

const userServices = {
    getAllUser: () => {
        return Users.findAll()
    },

    getUserId: (id) => {
        return Users.findByPk(id)
    },

    findUserEmail: (text) => {
        return Users.findOne({where: {email: text}})
    },

    createUser: (nuevoUsuario) => {
        console.log("NUEVO USUARIO DATOS =====>>>>>", nuevoUsuario)
        return Users.create({
            id: nuevoUsuario.id,
            name: nuevoUsuario.name,
            last_name: nuevoUsuario.lastName,
            email: nuevoUsuario.email,
            password: nuevoUsuario.password,
            profile_picture: nuevoUsuario.profile_picture,
            rank: nuevoUsuario.rank
        })
    },

    updateUser: (user, id) => {
        return Users.update({
            name: user.name,
            last_name: user.last_name
        }, {
            where:{id: id}
        })
    }
}

module.exports = userServices

