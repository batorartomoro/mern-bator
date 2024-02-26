import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import timRoutes from "./routes/tim.route.js";
import projectRoutes from "./routes/project.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(
    process.env.MONGO
).then(
    ()=>{console.log('Berhasil koneksi ke Monggo DB..!!')},
).catch(err=>{
    console.log(err);
})
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(4000,()=>{
    console.log('Server berjalan di port 4000 !');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/tim',timRoutes);
app.use('/api/comment',commentRoutes);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Kesalahan Internal Server terjadi..';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});