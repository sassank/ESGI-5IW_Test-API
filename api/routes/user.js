const express = require("express");
const router = express();
const User = require("../database//models/User");

// Set RESTFUL api routes for sequilize model User
router.get("/", (req, res) => {
    User.findAll().then(users => {
        res.json(users).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set get route
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id).then(user => {
        res.json(user).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set post route
router.post("/", (req, res) => {
    User.create(req.body).then(user => {
        res.json(user).status(201); // 201 = Created
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set put route
router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.json(user).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set delete route
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(user => {
        res.json(user).status(204); // 204 = No content
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

module.exports = router;