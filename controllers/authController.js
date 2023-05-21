const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { jwtSecret } = require('../config/index');
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({ Status: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) {
            return res.status(400).json({ Status: 'Invalid Credentials' });
        }
        // if (!isMatch) {
        //   return res.status(400).json({ msg: 'Invalid Credentials' });
        // }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, Status: 'Success' });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
