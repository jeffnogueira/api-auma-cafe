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
        
        app.db('typeCoffe')
            .insert({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const get = (req, res) => {

        app.db('typeCoffe')
            .orderBy('id', 'desc')
            .then(typeCoffe => res.json(typeCoffe))
            .catch(err => res.status(400).json(err))
    }

    const getById = (req, res) => {

        app.db('typeCoffe')
            .select('typeCoffe.id', 'typeCoffe.description')
            .where({ id: req.params.idTypeCoffe })
            .limit(1)
            .then(bag => res.json(bag))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('typeCoffe')
            .where({ id: req.body.idTypeCoffe })
            .update({ description: req.body.description })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('typeCoffe')
            .where({ id: req.params.idTypeCoffe })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado tipo com id ${req.params.idTypeCoffe}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, getById, save, update, remove }
}