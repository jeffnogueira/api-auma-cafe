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
        
        app.db('avenue')
            .insert({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const get = (req, res) => {

        app.db('avenue')
            .orderBy('id', 'desc')
            .then(avenue => res.json(avenue))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('avenue')
            .where({ id: req.body.idAvenue })
            .update({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('avenue')
            .where({ id: req.params.idAvenue })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado avenida com id ${req.params.idAvenue}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, save, update, remove }
}