const { UUIDV1, DataTypes, UUID } = require('sequelize')
const sequelize = require('../config/db.config.cjs')




const BLOG = sequelize.define("BLOG",{

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV1
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull:false
    },

    coverImage:{
        type:DataTypes.STRING,
        allowNull:true    
    },

    userId:{
        type:UUID,
        allowNull:false
    }

})

module.exports = BLOG