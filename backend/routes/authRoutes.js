const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Create account
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Could not create account' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid password or user' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(400).json({ error: 'Could not login' });
    }
});

module.exports = router;