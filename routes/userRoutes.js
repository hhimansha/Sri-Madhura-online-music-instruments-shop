const express = require("express");
const router = express.Router();
const {
    signUpUser,
    getUsers,
    getUser,
    loginUser,
    deleteUser,
    recover,
    reset,
    createAddress,
    getUserAddresses,
    updateUser,
    deleteUserAddress,
    } = require("../controllers/userController")

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

router.post("/signup", signUpUser);

// Setup route for creating or updating delivery address (protected route)
router.route("/user/address/:id").get(getUserAddresses);

// Setup route for creating or updating delivery address (protected route)
router.route("/user/address/:id").post(createAddress);

router.route("/user/address/:id").delete(deleteUserAddress);

// Setup route for updating user details (protected route)
router.route("/user/update/:id").put(updateUser);

router.route("/recover").post(recover);
router.route("/reset").post(reset);
//  Restricted to admin users
router.get('/admin/dashboard', verifyToken, requireRole('admin'), (req, res) => {
    res.json({ message: "Welcome to the admin dashboard!" });
});

// setup route for get a specific book
router.route("/admindash/users/").get(getUsers);

// setup route for get a specific
router.route("/admindash/users/:id").get(getUser);

router.post("/login", loginUser);

//setup route for delete a user
router.route("/admindash/users/:id").delete(deleteUser)

module.exports = router;

