const express = require("express");
const router = express();
const Car = require("../database/models/Car");

// Set RESTFUL api routes for sequilize model Car
router.get("/", (req, res) => {
    Car.findAll().then(Cars => {
        res.json(Cars).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set get route
router.get("/:id", (req, res) => {
    Car.findByPk(req.params.id).then(car => {
        if (car === null) {
            res.status(404).json({});
        } else {
            res.status(200).json(car); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set post route
router.post("/", (req, res) => {
    Car.create(req.body).then(car => {
        res.status(201).json(car); // 201 = Created
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set put route
router.put("/:id", (req, res) => {
    Car.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).then(car => {
        if (car[0] == 0) {
            res.status(404).json({}); // 404 = Not Found
        } else {
            res.status(200).json(car[1][0]); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set delete route
router.delete("/:id", (req, res) => {
    Car.destroy({
        where: {
            id: req.params.id
        }
    }).then(Car => {
        res.json(Car).status(204); // 204 = No content
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

module.exports = router;