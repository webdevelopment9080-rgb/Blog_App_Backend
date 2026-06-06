
const app = require('./app.cjs');
const sequelize = require('./config/db.config.cjs')
const dotenv = require('dotenv')
dotenv.config()

let port = process.env.DB_PORT || 3000;



(async ()=>{


try {
    await sequelize.sync({alter:true, force:false})
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
})()

app.listen(port, ()=>{

    console.log("Server is up")
    // console.log(process.env, '--------------------------------------------------------------------');
})