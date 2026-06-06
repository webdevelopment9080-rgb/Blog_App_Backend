const authorRoutes = require("./routes/authorRoutes.cjs");
const userRoutes = require("./routes/userRoutes.cjs");
const express = require('express')
const app = express();
const cors = require('cors');
const blogRoutes = require("./routes/blogRoutes.cjs");


app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/uploads", express.static("uploads"))
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/users", userRoutes);
app.use('/api/v1/authors', authorRoutes)
app.use('/api/v1/blogs', blogRoutes)

module.exports = app