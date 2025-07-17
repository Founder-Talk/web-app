const Post = require('../models/post.model');
const User = require('../models/user.model');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = null;
        if (req.file) {
            const cloudinaryResult = await uploadOnCloudinary(req.file.path);
            imageUrl = cloudinaryResult?.secure_url;
        }
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }
        const newPost = await Post.create({
            title,
            content,
            post: imageUrl,
            user: req.user.id // assumes auth middleware sets req.user
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name role');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all mentor posts
const getMentorPosts = async (req, res) => {
    try {
        // Find users with role mentor
        const mentors = await User.find({ role: 'mentor' }).select('_id');
        const mentorIds = mentors.map(m => m._id);
        const posts = await Post.find({ user: { $in: mentorIds } }).populate('user', 'name role');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single post
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name role');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let postUrl = req.body.post; // fallback to existing if not uploading new
        if (req.file) {
            const cloudinaryResult = await uploadOnCloudinary(req.file.path);
            postUrl = cloudinaryResult?.secure_url;
        }
        const updated = await Post.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, content, post: postUrl },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'Post not found or unauthorized' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleted) return res.status(404).json({ message: 'Post not found or unauthorized' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Like a post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.likes.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already liked this post.' });
        }
        post.likes.push(req.user.id);
        await post.save();
        res.status(200).json({ message: 'Post liked successfully', likes: post.likes.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const index = post.likes.indexOf(req.user.id);
        if (index === -1) {
            return res.status(400).json({ message: 'You have not liked this post.' });
        }
        post.likes.splice(index, 1);
        await post.save();
        res.status(200).json({ message: 'Post unliked successfully', likes: post.likes.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a comment to a post
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: 'Comment text is required.' });
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const user = await User.findById(req.user.id);

        const comment = {
            name: user.name,
            profilePic: user.profilePic,
            text,
            createdAt: new Date()
        };
        post.comments.push(comment);
        await post.save();
        res.status(201).json({ message: 'Comment added successfully', comments: post.comments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getMentorPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment
}; 