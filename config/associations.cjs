const BLOG = require('../Models/blogModel.cjs')
const USER = require('../Models/userModel.cjs')



USER.hasMany(BLOG, {foreignKey:"userId"})
BLOG.belongsTo(USER, {foreignKey:"userId"})



module.exports = {USER, BLOG}