const { uuid } = require('unique-string-generator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      secrete_id:{
        type: DataTypes.STRING,
        defaultValue: uuid.v4()
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password','isAdmin'] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ['password','isAdmin'] },
        },
      },
    },
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
