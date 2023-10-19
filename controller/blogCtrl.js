const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const {cloudinaryUploadImg} = require("../utils/cloudinary");
const {cloudinaryDeleteImg} = require("../utils/cloudinary");



const fs = require("fs");
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});




const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const files = req.files;
    const urls = [];
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});





const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadImages,
  deleteImages,
};








































// const Blog = require("../models/blogModel");
// const User = require("../models/userModel");
// const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongodbId");
// const cloudinaryUploadImg = require("../utils/cloudinary");
// const fs = require("fs");



// const createBlog = asyncHandler(async (req, res) => {
//   try {
    
//     const newBlog = await Blog.create(req.body);
//     res.json(newBlog);
//     //console.log(req.body);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
  



// const updateBlog = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(updateBlog);
//   } catch (error) {
//     throw new Error(error);
//   }
// });




// const getBlog = asyncHandler(async (req, res) => {
//  const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const getBlog = await Blog.findById(id)
//       .populate("likes")
//       .populate("dislikes");
      
//     const updateViews = await Blog.findByIdAndUpdate(
//      id,
//       {
//         $inc: { numViews: 1 },
//       },

//       { new: true }
//     );
//     res.json(getBlog);
//   }catch (error) {
//     throw new Error(error);
//   }
// });




// const getAllBlogs = asyncHandler(async (req, res) => {
//   try {
//     const getBlogs = await Blog.find();
//     res.json(getBlogs);
//   } catch (error) {
//     throw new Error(error);
//   }
// });


// const deleteBlog = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(id);
//     res.json(deletedBlog);
//   }catch (error) {
//    throw new Error(error);
//   }
// });


// const likeBlog = asyncHandler(async (req, res) => {
//   try {
//     const { blogId } = req.body;
//     validateMongoDbId(blogId);

//     // Find the blog to be liked
//     const blog = await Blog.findById(blogId);

//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }

//     const loginUserId = req?.user?._id;

//     // Check if the user has already disliked the blog
//     if (blog.dislikes.includes(loginUserId)) {
//       blog.dislikes.pull(loginUserId);
//       blog.isDisliked = false;
//     }

//     if (blog.likes.includes(loginUserId)) {
//       // User already liked the blog, so remove the like
//       blog.likes.pull(loginUserId);
//       blog.isLiked = false;
//     } else {
//       // User has not liked the blog, so add the like
//       blog.likes.push(loginUserId);
//       blog.isLiked = true;
//     }

//     const updatedBlog = await blog.save();

//     res.json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });



// const dislikeBlog = asyncHandler(async (req, res) => {
//   const { blogId } = req.body;
//   validateMongoDbId(blogId);
//   // Find the blog which you want to be liked
//   const blog = await Blog.findById(blogId);
//   // find the login user
//   const loginUserId = req?.user?._id;
//   // find if the user has liked the blog
//   const isDisLiked = blog?.isDisliked;
//   // find if the user has disliked the blog
//   const alreadyLiked = blog?.likes?.find(
//     (userId) => userId?.toString() === loginUserId?.toString()
//   );
//   if (alreadyLiked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   }
//   if (isDisLiked) {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $pull: { dislikes: loginUserId },
//         isDisliked: false,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   } else {
//     const blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $push: { dislikes: loginUserId },
//         isDisliked: true,
//       },
//       { new: true }
//     );
//     res.json(blog);
//   }
// });  



// const uploadImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const uploader = (path) => cloudinaryUploadImg(path, "images");
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newpath = await uploader(path);
//       console.log(newpath);
//       urls.push(newpath);
//       fs.unlinkSync(path);
//     }
//     const findBlog = await Blog.findByIdAndUpdate(
//       id,
//       {
//         images: urls.map((file) => {
//           return file;
//         }),
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(findBlog);
//   } catch (error) {
//     throw new Error(error);
//   }
// });



// module.exports = {
//   createBlog,
//   updateBlog,    
//   getBlog,
//   getAllBlogs,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
//   uploadImages

// };