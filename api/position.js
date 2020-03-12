const { check, validationResult } = require('express-validator/check');

module.exports = app => {

    const validation = [
        check('description').trim().not().isEmpty().withMessage('Campo descrição não pode ser vazio.')
    ]

    const save = (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        app.db('position')
            .insert({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const get = (req, res) => {

        app.db('position')
            .orderBy('id', 'desc')
            .then(position => res.json(position))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('position')
            .where({ id: req.body.idLocation })
            .update({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('position')
            .where({ id: req.params.idLocation })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado posição com id ${req.params.idLocation}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, save, update, remove }
}