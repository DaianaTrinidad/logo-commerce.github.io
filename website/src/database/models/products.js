module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      "Products",
      {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        price: DataTypes.DECIMAL,
        discount: DataTypes.INTEGER,
        product_name: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    Model.associate = (model) => {

      Model.belongsToMany(model.Size, {
        as: "size",
        through: "products_size",
        foreignKey: "id_product",
        otherKey: "id_size",
        timestamps: false
    });

      Model.belongsToMany(model.ShoppingCart, {
        as: "shopping_cart",
        through: "products_shopping_cart",
        foreignKey: "id_product",
        otherKey: "id_shopping_cart",
        timestamps: false
      })
    }

    return Model;
  };