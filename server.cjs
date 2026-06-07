
const app = require('./app.cjs');
const sequelize = require('./config/db.config.cjs')
const dotenv = require('dotenv')
dotenv.config()

let port = process.env.PORT || || 3000;
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USERNAME:", process.env.DB_USERNAME);


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
