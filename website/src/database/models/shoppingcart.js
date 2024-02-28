module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      "ShoppingCart",
      {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        image: DataTypes.STRING,
        product_name: DataTypes.STRING,
        id_product: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        size: DataTypes.STRING,
        total: DataTypes.INTEGER,
        id_users: DataTypes.INTEGER
      },
      {
        tableName: "shopping_cart",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    Model.associate = (model) => {

      Model.belongsToMany(model.Products, {
        as: "products",
        through: "products_shopping_cart",
        foreignKey: "id_shopping_cart",
        otherKey: "id_product",
        timestamps: false
      });

      Model.belongsTo(model.Users, {
        as:"users",
        foreignKey:"id_users"
      });
    }
  
    return Model;
  };