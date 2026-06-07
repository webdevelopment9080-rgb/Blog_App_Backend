const { BLOG, USER } = require("../config/associations.cjs")


let getBlog = async (req, res)=>{

try {
    
    let {id} = req.params

    let blog = await BLOG.findByPk(id, {
        include:[
            {
                model:USER,
                attributes:["name", "email", "role"]
            }
        ]
    })

    if (!blog) {
        return res.status(404).json({
            message:"Blog Not Found"
        })
    }

    return res.status(200).json({
        message:"Blog Found Successfully",
        data:blog
    })


} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Internal Server Error"
    })
}


}
let getBlogs = async (req, res) => {
  try {
    let blogs = await BLOG.findAll({
      include: [{ model: USER, attributes: ['name', 'email'] }]
    });

    return res.status(200).json({
      message: "Blogs Returned Successfully",
      data: blogs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



let updateBlog = async (req, res)=>{

try {
    
    

    let {title, content} = req.body
    let {id} = req.params;

    let blog = await BLOG.findByPk(id)

    if (!blog) {
        return res.status(404).json({
            message:"Blog Not Found"
        })
    }

    if (blog.userId !== req.id) {
        return res.status(400).json({
            message:"You can only update your own blogs"
        })
    }

    let coverImage = req.file ?`${process.env.BASE_URL}/uploads/${req.file.filename}`: blog.coverImage

   
    await blog.update({
        title: title || blog.title,
        content: content || blog.content,
        coverImage
    })

    return res.status(200).json({
        message:"Blog Updated Successfully",
        data: blog
    })

} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Internal Server Error"
    })
}


}

let deleteBlog = async (req, res)=>{

try {
    
   
    let {id} = req.params // blog id
    let blog = await BLOG.findByPk(id)

    if (!blog) {
        return res.status(404).json({
            message:"Blog Not Found"
        })
    }

    if (blog.userId !== req.id) {
        return res.status(400).json({
            message:"You can only delete your own blog"
        })
    }
    
    await blog.destroy()


    return res.status(200).json({
        message:"Blog Deleted Successfully ",
        data: blog.id
    })


} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Internal Server Error"
    })
}


}


module.exports = {getBlog, getBlogs, updateBlog, deleteBlog}