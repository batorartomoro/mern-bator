import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    nama: {
        type: String,
        required: true,
      },
    deskripsi: {
      type: String,
      required: true,
    },
    jabatan: {
      type: String,
      required: true,
     
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
      slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Tim = mongoose.model('Tim', postSchema);

export default Tim;