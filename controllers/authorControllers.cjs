

const getAuthor = (req, res)=>{
   try {
     return res.status(200).json({
       message: "Author Returned",
       data: {
         id: 46,
         email: "sadfasdf@gmail.com",
         role: 'author'
       },
     });
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       message: "Internal Server Error",
     });
   }
}
const getAuthors = (req, res)=>{
   try {
     return res.status(200).json({
       message: "Authors Returned",
       data:[ {
         id: 45,
         email: "sadfasdf@gmail.com",
         role: 'author'
       }],
     });
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       message: "Internal Server Error",
     });
   }
}

const addAuthor = (req, res)=>{
    try {
        
        return res.status(201).json({
            message: 'Author Created',
            data: {
                id: 56,
                email: 'adf@email.com'
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
const updateAuthor = (req, res)=>{
   try {
     return res.status(200).json({
       message: "Author updated",
       data: {
         id: 45,
         email: "sadfasdf@gmail.com",
         role: 'author'
       },
     });
   } catch (error) {
     console.log(error);
     return res.status(500).json({
       message: "Internal Server Error",
     });
   }
}

const deleteAuthor = (req, res)=>{
    try {
        
        return res.status(200).json({
            message: 'Author Deleted',
            data: {id: 12}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}


module.exports = {getAuthor,addAuthor,  getAuthors, updateAuthor, deleteAuthor}