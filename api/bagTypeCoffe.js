const { check, validationResult } = require('express-validator/check');

module.exports = app => {

    const validation = [
        check('idBag').trim().not().isEmpty().withMessage('Campo Bag não pode ser vazio.'),
        check('idTypeCoffe').trim().not().isEmpty().withMessage('Campo Tipo Café não pode ser vazio.'),
    ]

    const save = (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        app.db('bagTypeCoffe')
        .insert({ 
            idTypeCoffe: req.body.idTypeCoffe,
            idBag: req.body.idBag })
        .then(_ => res.status(202).send())
        .catch(err => res.status(500).json(err))
    }

    const get = (req, res) => {

        app.db('bagTypeCoffe')
            .innerJoin('typecoffe', 'bagtypecoffe.idTypecoffe', '=', 'typecoffe.id')
            .where({ 
                idBag: req.params.idBag })
            .orderBy('idTypeCoffe', 'desc')
            .then(bagTypeCoffe => res.json(bagTypeCoffe))
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('bagTypeCoffe')
            .where({ 
                idTypeCoffe: req.params.idTypeCoffe,
                idBag: req.params.idBag })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado tipo do café com id ${req.params.idTypeCoffe}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, save, remove }
}