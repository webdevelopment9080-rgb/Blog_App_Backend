const jwt = require("jsonwebtoken")
const USER  = require("../Models/userModel.cjs")

const authentication = async (req, res, next)=>{
try {
    
    const token = req.headers.authorization || req.headers.Authorization

    if (!token) {
        return res.status(400).json({
            message:"Please Provide Token To Proceed."
        })
    }

    let spiltToken = token.split(" ")[1]

    let verifyToken;

    try {
        
        verifyToken = jwt.verify(spiltToken, process.env.JSON_SECRET_KEY);

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Token Verification Failed."
        })
    }

    let user = await USER.findOne({
        where:{
            id: verifyToken.id
        }
    })

    req.id = verifyToken.id
    req.token = verifyToken.token
    req.role = user.role

    next()
} catch (error) {
    
console.log(error, "Error from authentication Middleware")

return res.status(500).json({
    message: "Internal Server Error"
})

}
}


module.exports = authentication