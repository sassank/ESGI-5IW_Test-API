const express = require("express");
const router = express();
const Transaction = require("../database/models/Transaction");

// Set RESTFUL api routes for sequilize model Transaction
router.get("/", (req, res) => {
    Transaction.findAll().then(Transactions => {
        res.status(200).json(Transactions); // 200 = OK
    }
    ).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    }
    );
});

// Set get route
router.get("/:id", (req, res) => {
    Transaction.findByPk(req.params.id).then(transaction => {
        if (transaction === null) {
            res.status(404).json({});
        } else {
            res.status(200).json(transaction); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set post route
router.post("/", (req, res) => {
    Transaction.create(req.body).then(transaction => {
        res.status(201).json(transaction); // 201 = Created
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set put route
router.put("/:id", (req, res) => {
    Transaction.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    }).then(transaction => {
        if (transaction[0] == 0) {
            res.status(404).json({}); // 404 = Not Found
        } else {
            res.status(200).json(transaction[1][0]); // 200 = OK
        }
    }).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    });
});

// Set delete route
router.delete("/:id", (req, res) => {
    Transaction.destroy({
        where: {
            id: req.params.id
        }
    }).then(Transaction => {
        res.status(204).json(Transaction); // 204 = No content
    }
    ).catch(err => {
        res.status(500).json(err); // 500 = Internal Server Error
    }
    );
});

module.exports = router;