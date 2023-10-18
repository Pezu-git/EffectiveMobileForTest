const router = require("express").Router();
const db = require("../models");
const Users = db.users;
const UpdateUser = db.updeateUser;


router.get('/', (req, res) => {
    Users.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Create Error."
            });
        });
})
router.get('/update', (req, res) => {
    UpdateUser.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Create Error."
            });
        });
})
router.get('/update/:id/:page', (req, res) => {
    const user_id = req.params.id
    const page = req.params.page
    const limit = 2
    const offset = limit * Number(page - 1)
    console.log(offset)
    UpdateUser.findAll({
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']],
        where: {
            userId: user_id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Create Error."
            });
        });
})

router.post('/create', (req, res) => {
    const user_data = {
        userId: req.body.id
    }
    Users.create(user_data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Create Error."
            });
        });
})

router.put('/update', (req, res) => {
    const user_data = {
        userId: req.body.id,
        history: JSON.stringify(req.body.data)
    }
    console.log(user_data)
    UpdateUser.create(user_data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Create Error."
            });
        });
})


module.exports = router