const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login function
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const connection = await db.getConnection();

        // Query the user from the database
        const result = await connection.execute(
            `SELECT id, password, role FROM Users WHERE username = :username`,
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found!" });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user[1]); // Compare hashed passwords

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user[0], role: user[2] },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
