const { DataTypes, UUIDV1 } = require('sequelize')
const sequelize = require('../config/db.config.cjs')




const USER = sequelize.define("USER", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV1,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("user", "author", "admin"),
    defaultValue:"user",
    allowNull: false,
  },
});



module.exports = USER