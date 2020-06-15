const router = require("express").Router();

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        if (user.username && user.password !== undefined) {
            const saved = await Users.add(user);
            res.status(201).json(user);
        } else {
            res.status(401).json({
                message: "please provide username and password",
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.findBy({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({
                message: `Welcome ${user.username}!`,
            });
        } else {
            res.status(401).json({ message: "invalid username or password" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
