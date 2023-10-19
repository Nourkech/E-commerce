const express = require ('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const { notFound, errorHandler } = require("./middelwares/errorHandler");
const bodyParser =require("body-parser");
const dotenv=require("dotenv").config();
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const blogCategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");


dbConnect();
const PORT = process.env.PORT ;

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/*//Routes//*/

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blogCategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon",couponRouter);


app.use(notFound);
app.use(errorHandler);








app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});