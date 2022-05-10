const express = require("express");
const router = express();
const Transaction = require("../database//models/Tr");

// Set RESTFUL api routes for sequilize model Transaction
router.get("/", (req, res) => {
    Transaction.findAll().then(Transactions => {
        res.json(Transactions).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set post route
router.post("/", (req, res) => {
    Transaction.create(req.body).then(Transaction => {
        res.json(Transaction).status(201); // 201 = Created
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


// Set put route
router.put("/:id", (req, res) => {
    Transaction.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(Transaction => {
        res.json(Transaction).status(200); // 200 = OK
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

// Set delete route
router.delete("/:id", (req, res) => {
    Transaction.destroy({
        where: {
            id: req.params.id
        }
    }).then(Transaction => {
        res.json(Transaction).status(204); // 204 = No content
    }
    ).catch(err => {
        res.json(err).status(500); // 500 = Internal Server Error
    }
    );
});

module.exports = router;