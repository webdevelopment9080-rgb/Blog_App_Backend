const USER = require("../Models/userModel.cjs");
const bcrypt = require("bcrypt");
const validator = require('validator')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {


   
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide full data",
      });
    }

    const checkEmail = validator.isEmail(email)

    if (!checkEmail) {
        console.log("Email is not strong")
        return res.status(400).json({
            message: "Please provide strong email"
        })
    }

    const checkPassword = validator.isStrongPassword(password)

    if (!checkPassword) {
      console.log("Password is not strong");
      return res.status(400).json({
        message: "Please provide strong password",
      });
    }




    let checkUser = await USER.findOne({
      where: {
        email: email,
      },
    });
    console.log(checkUser, "DATA FROM DB");

    if (checkUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let user = await USER.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    console.log(user, "user");

    return res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) =>{
    try {
        
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please Provide email and password"
            })
        }

        let userExists = await USER.findOne({
            where:{
                email: email
            }
        })

        if (!userExists) {
            return res.status(404).json({
                message: "User does not exist"
            })
        }

        let comparePassword = await bcrypt.compare(password ,userExists.password )

        if (!comparePassword) {
            return res.status(400).json({
                message: "Incorrect Password",
                data: userExists
            })
        }


        const token = jwt.sign(
          { id: userExists.id },
          process.env.JSON_SECRET_KEY
          , {
            expiresIn:"5d"
          }
        );


        return res.status(200).json({
            message: "User Logged In",
            data: {
                token,
                user: userExists
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const getAllUsers = async (req, res) => {
  try {
    let getUsers = await USER.findAll();

    console.log(getUsers, "GET USERS");

    return res.status(200).json({
      message: "Successfully Got Users",
      data: getUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    // let {email} = req.body
    let { id } = req.params;
    console.log(id, "From parameters");

    if (!id) {
      return res.status(400).json({
        message: "Provide full data",
      });
    }

    let checkUser = await USER.findOne({
      where: { id },
    });

    if (!checkUser) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      message: "User Returned",
      data: checkUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMe = async (req, res)=>{
  try {
    
    

    let myData = await USER.findByPk(req.id);
    
    if (!myData) {
      return res.status(404).json({
        message:"User Not Found"
      })
    }

    return res.status(200).json({
      message:"User Returned",
      data: {
        id: myData.id,
        name: myData.name,
        email: myData.email,
        role: myData.role
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

const updateUser = async (req, res) => {
  try {
    
    const { name, email } = req.body;


    let checkUser = await USER.findByPk(req.id);

    if (!checkUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    let updateUser = await USER.update(
      {
        name,
        email,
      },

      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      message: "User Updated",
      data: {
        id: updateUser.id,
        name: updateUser.name, 
        email: updateUser.email,
        role: updateUser.role
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
   

    let deleteUser = await USER.destroy({
      where: {
        id: req.id,
      },
    });

    return res.status(200).json({
      message: "User has been deleted",
      data: deleteUser.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getAllUsers, getUser, register,login, updateUser, deleteUser, getMe };
