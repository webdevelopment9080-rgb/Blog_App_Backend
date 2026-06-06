const {getAuthor, getAuthors, addAuthor, updateAuthor, deleteAuthor} = require('./authorControllers.cjs')
const {getUser, getMe, getAllUsers, register, login, updateUser, deleteUser } = require('./userController.cjs')



module.exports = {
  getAuthor,
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  
  getMe,
  getUser, // User Controllers
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
};