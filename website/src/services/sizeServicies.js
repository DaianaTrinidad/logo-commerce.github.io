const { Size } = require("../database/models");
const Sequelize = require("sequelize");

const sizeServices = {

    getAllSize:()=>{
        return Size.findAll()
    },

    getSizeId: (id) => {
        return Size.findByPk(id)
    },

   
};

module.exports = sizeServices;