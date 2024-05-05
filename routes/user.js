const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


// Token verification function
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check both cookies and authorization header
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decoded; // Store decoded token data in the request
        next(); // Continue to the next middleware or route handler
    });
};

// Role-based authorization function
const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: `Requires ${role} role` }); // Return an error if roles don't match
        }

        next(); // If roles match, proceed
    };
};

//  Restricted to admin users
router.get('/admin/dashboard', verifyToken, requireRole('admin'), (req, res) => {
    res.json({ message: "Welcome to the admin dashboard!" });
});

router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password, phone, role } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        return res.json({ message: "User already exist" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashpassword,
        phone,
        role: role || 'user',

    })

    await newUser.save();
    return res.json({ status: true, message: "record registered" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ message: "User is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({ message: "password is incorect" })
    }
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    return res.json({ status: true, message: "login successful", role: user.role })
})

router.post('/recover', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "User not registered" })
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '10m' })

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'srimadhuramusicalinstruments@gmail.com',
                pass: 'ugto dqub fcpd zddq'
            }
        });

        var mailOptions = {
            from: 'srimadhuramusicalinstruments@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:3000/reset/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error Sending Email" })

            } else {
                return res.json({ status: true, message: "Email Sent" })

            }
        });

    } catch (err) {
        console.log(err)

    }
}

)

router.post('/reset/:token', async (req, res) => {
    const token = req.params.token;
    const {password} = req.body;

    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({_id: id}, {password: hashpassword});
        return res.json({status: true, message:"Password Updated"});
    } catch (err) {
        return res.json("Invalid Token");
    }
}
)

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete a User

// DELETE a user by ID
router.delete('/:id',  async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

//get user by id
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;