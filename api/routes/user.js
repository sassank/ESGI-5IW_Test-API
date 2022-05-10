const express = require("express");
const router = express();
const User = require("../database//models/User");

// Set RESTFUL api routes for sequilize model User
router.get("/", (req, res) => {
    User.findAll().then(users => {
        res.status(200).json(users); // 200 = OK
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set get route
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (user === null) {
            res.status(404).json({});
        } else {
            res.status(200).json(user); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set post route
router.post("/", (req, res) => {
    User.create(req.body).then(user => {
        res.status(201).json(user); // 201 = Created
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set put route
router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).then(user => {
        if (user[0] == 0) {
            res.status(404).json({}); // 404 = Not Found
        } else {
            res.status(200).json(user[1][0]); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set delete route
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.status(204).end(); // 204 = No content
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

module.exports = router;