const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');

// Create a new blog
router.post('/', async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newBlog = new Blog({ title, description, image });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read a single blog
router.get('/:id', getBlog, (req, res) => {
    res.json(res.blog);
});

// Update a blog
router.patch('/:id', getBlog, async (req, res) => {
    if (req.body.title != null) {
        res.blog.title = req.body.title;
    }
    if (req.body.description != null) {
        res.blog.description = req.body.description;
    }
    if (req.body.image != null) {
        res.blog.image = req.body.image;
    }
    try {
        const updatedBlog = await res.blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog
router.delete('/:id', getBlog, async (req, res) => {
    try {
        await res.blog.remove();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single blog by ID
async function getBlog(req, res, next) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog == null) {
            return res.status(404).json({ message: 'Cannot find blog' });
        }
        res.blog = blog;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
