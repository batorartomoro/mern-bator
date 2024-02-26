import Tim from "../models/tim.model.js";
import { errorHandler }  from "../utils/error.js"

export const create=async(req,res,next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403,'Tidak diperbolehkan membuat Anggota Tim..!!'));
    }
    if(!req.body.nama){
        return next(errorHandler(400,'Silahkan isi semua field..!!'));
    }
    const slug=req.body.nama.split(' ').join('-').toLowerCase().replace(/[^a-zA-z0-9-]/g,'');
    const newTim=new Tim ({
        ...req.body,slug,userId:req.user.id,
    });
    try {
        const savedTim=await newTim.save();
        res.status(201).json(savedTim);
    } catch (error) {
        next(error);
    }
};
export const gettims = async(req,res,next)=>{
    try {
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 6;
        const sortDirection=req.query.order === 'asc' ? 1 : -1;
        const tim = await Tim.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.nama && { nama: req.query.nama }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.timId && { _id: req.query.timId }),
            ...(req.query.searchTerm && {
              $or: [
                { jabatan: { $regex: req.query.searchTerm, $options: 'i' } },
                { deskripsi: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
            }),
          })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

            const totalTim=await Tim.countDocuments();
            const now = new Date();
            const oneMonthAgo=new Date(
                now.getFullYear(),
                now.getMonth()-1,
                now.getDate()
            );
            const lastMonthPosts=await Tim.countDocuments({
                createdAt:{$gte:oneMonthAgo},
            });
            res.status(200).json({
                tim,
                totalTim,
                lastMonthPosts
            });

    } catch (error) {
        next(error);
    }
};
export const deletetim = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Tidak bisa menghapus data..!!'));
    }
    try {
      await Tim.findByIdAndDelete(req.params.timId);
      res.status(200).json('Anggota Tim berhasil dihapus..!!');
    } catch (error) {
      next(error);
    }
  };
  
  export const updatetim = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Kamu tidak bisa update data Tim..!!'));
    }
    try {
      const updatedTim = await Tim.findByIdAndUpdate(
        req.params.timId,
        {
          $set: {
            nama: req.body.nama,
            jabatan: req.body.jabatan,
            deskripsi: req.body.deskripsi,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedTim);
    } catch (error) {
      next(error);
    }
  };