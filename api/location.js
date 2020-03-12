const { check, validationResult } = require('express-validator/check');

module.exports = app => {

    const validation = [
        check('idStreet').trim().not().isEmpty().withMessage('Campo rua não pode ser vazio.'),
        check('idAvenue').trim().not().isEmpty().withMessage('Campo avenida não pode ser vazio.'),
        check('idFloor').trim().not().isEmpty().withMessage('Campo andar não pode ser vazio.'),
        check('idPosition').trim().not().isEmpty().withMessage('Campo posição não pode ser vazio.'),
    ]

    const save = (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        app.db('location')
            .insert({ idStreet: req.body.idStreet, 
                    idAvenue: req.body.idAvenue, 
                    idFloor: req.body.idFloor, 
                    idPosition: req.body.idPosition })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const get = (req, res) => {

        app.db('location')
            .leftJoin('bag', 'location.id', '=', 'bag.idLocation')
            .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
            .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
            .innerJoin('position', 'location.idPosition', '=', 'position.id')
            .innerJoin('street', 'location.idStreet', '=', 'street.id')
            .select('location.id', 
                    'bag.lot as lot', 
                    'avenue.description as avenue', 
                    'street.description as street', 
                    'position.description as position',
                    'floor.description as floor')
            .groupBy('location.id')
            .orderBy('avenue', 'asc')
            .orderBy('street', 'asc')
            .orderBy('position', 'asc')
            .orderBy('floor', 'asc')
            .then(location => res.json(location))
            .catch(err => res.status(400).json(err))
    }

    const getFree = (req, res) => {

        app.db('location')
            .leftJoin('bag', 'location.id', '=', 'bag.idLocation')
            .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
            .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
            .innerJoin('position', 'location.idPosition', '=', 'position.id')
            .innerJoin('street', 'location.idStreet', '=', 'street.id')
            .select('location.id', 
                    'avenue.description as avenue', 
                    'street.description as street', 
                    'position.description as position',
                    'floor.description as floor')
            .whereNull('bag.idLocation')
            .orderBy('avenue', 'asc')
            .orderBy('street', 'asc')
            .orderBy('position', 'asc')
            .orderBy('floor', 'asc')
            .then(location => res.json(location))
            .catch(err => res.status(400).json(err))
    }

    const getById = (req, res) => {

        app.db('location')
            .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
            .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
            .innerJoin('position', 'location.idPosition', '=', 'position.id')
            .innerJoin('street', 'location.idStreet', '=', 'street.id')
            .select('location.id as idLocation', 
                    'avenue.id as idAvenue', 
                    'floor.id as idFloor', 
                    'street.id as idStreet', 
                    'position.id as idPosition', 
                    'avenue.description as descriptionAvenue', 
                    'floor.description as descriptionFloor', 
                    'street.description as descriptionStreet', 
                    'position.description as descriptionPosition')
            .where({ 'location.id': req.params.idLocation })
            .limit(1)
            .then(location => res.json(location[0]))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('location')
            .where({ 'location.id': req.body.idLocation })
            .update({ idStreet: req.body.idStreet, 
                    idAvenue: req.body.idAvenue, 
                    idFloor: req.body.idFloor, 
                    idPosition: req.body.idPosition })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('location')
            .where({ id: req.params.idLocation })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado localização com id ${req.params.idLocation}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, getById, getFree, save, update, remove }
}