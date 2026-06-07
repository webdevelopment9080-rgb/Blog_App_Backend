const express = require("express");
const authentication = require("../middleware/authenticationMiddleware.cjs");
const upload = require("../middleware/uploadMiddleware.cjs");
const BLOG = require("../Models/blogModel.cjs");
const { updateBlog, deleteBlog, getBlog, getBlogs } = require("../controllers/blogControllers.cjs");
const authorization= require("../middleware/authorizationMiddleware.cjs");

const blogRoutes = express.Router();


blogRoutes.post("/create", authentication, authorization(['author']),  upload.single("coverImage"),async (req, res)=>{


    try {
      const { title, content } = req.body;

const imageUrl = req.file ? req.file.path : null;
      
      const blog = await BLOG.create({
        title,
        content,
        coverImage: imageUrl,
        userId: req.id,
      });

      return res.status(200).json({
        message: "Blog Created",
        data: blog,
      });
    } catch (error) {

        console.log(error, "Error from blog routes")
        return res.status(500).json({
            message:"Internal Server Error",
            
        })
    }

})
 
blogRoutes.get("/", getBlogs)
blogRoutes.get("/:id", getBlog)
blogRoutes.patch("/:id", authentication, authorization(["author"]) , upload.single("coverImage"), updateBlog)
blogRoutes.delete("/:id", authentication, authorization(["author"]), deleteBlog)



module.exports = blogRoutes