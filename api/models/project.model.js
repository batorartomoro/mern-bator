import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isi: {
      type: String,
      required: true,
    },
    judul: {
      type: String,
      required: true,
      unique: true,
    },
    pemilik: {
        type: String,
        required: true,
      },
    website: {
        type: String,
        required: true,
      },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'bebas',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', postSchema);

export default Project;