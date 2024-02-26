import Project from "../models/project.model.js";
import { errorHandler }  from "../utils/error.js"

export const create=async(req,res,next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403,'Tidak diperbolehkan membuat daftar project..!!'));
    }
    if(!req.body.judul || !req.body.isi){
        return next(errorHandler(400,'Silahkan isi semua field..!!'));
    }
    const slug=req.body.judul.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g,'');
    const newProject=new Project ({
        ...req.body,slug,userId:req.user.id,
    });
    try {
        const savedProject=await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        next(error);
    }
};
export const getprojects = async(req,res,next)=>{
    try {
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection=req.query.order === 'asc' ? 1 : -1;
        const projects = await Project.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.projectId && { _id: req.query.projectId }),
            ...(req.query.searchTerm && {
              $or: [
                { judul: { $regex: req.query.searchTerm, $options: 'i' } },
                { isi: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
            }),
          })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

            const totalProject=await Project.countDocuments();
            const now = new Date();
            const oneMonthAgo=new Date(
                now.getFullYear(),
                now.getMonth()-1,
                now.getDate()
            );
            const lastMonthProject=await Project.countDocuments({
                createdAt:{$gte:oneMonthAgo},
            });
            res.status(200).json({
                projects,
                totalProject,
                lastMonthProject
            });

    } catch (error) {
        next(error);
    }
};
export const deleteproject = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Tidak bisa menghapus data project..!!'));
    }
    try {
      await Project.findByIdAndDelete(req.params.projectId);
      res.status(200).json('Project berhasil dihapus..!!');
    } catch (error) {
      next(error);
    }
  };
  
  export const updateproject = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Tidak diperbolehkan update project..!!'));
    }
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        {
          $set: {
            judul: req.body.judul,
            isi: req.body.isi,
            website: req.body.website,
            pemilik: req.body.pemilik,
            category: req.body.category,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  };