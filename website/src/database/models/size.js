module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      "Size",
      {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        size_name: DataTypes.STRING,
      },
      {
        tableName: "size",
        timestamps: false
      }
    );

    Model.associate = (model) => {

      Model.belongsToMany(model.Products, {
        as: "product",
        through: "products_size",
        foreignKey: "id_size",
        otherKey: "id_product",
        timestamps: false
    });
    }

    return Model;
  };
