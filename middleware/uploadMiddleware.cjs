const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;    


cloudinary.config({

    cloud_name: "",
    api_key: "",
    api_secret: "",

})

let storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"uploads",
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        resource_type: 'image',
    }
})


    let fileFilter = (req, file, callback)=>{

        if (file.mimetype.startsWith("image/")) {
            
                callback(null, true)
        } else {
            callback(new Error("Please upload an image file"), false)
        }
    }


    let upload = multer({
        storage,
        fileFilter,
        limits:{
            fileSize: 5 * 1024 * 1024
        }
    })


    module.exports = upload