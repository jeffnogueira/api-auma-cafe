const moment = require('moment');
const { check, validationResult } = require('express-validator/check');

module.exports = app => {

    const validation = [
        check('idLocation').trim().not().isEmpty().withMessage('Campo localização não pode ser vazio.'),
        //check('idTypeCoffe').trim().not().isEmpty().withMessage('Campo tipo café não pode ser vazio.'),
        check('lot').trim().not().isEmpty().withMessage('Campo lote não pode ser vazio.'),
        check('weight').trim().not().isEmpty().withMessage('Campo peso não pode ser vazio.'),
        check('producerName').trim().not().isEmpty().withMessage('Campo produtor não pode ser vazio.'),
        check('producerFarm').trim().not().isEmpty().withMessage('Campo fazenda não pode ser vazio.'),
        check('idCity').trim().not().isEmpty().withMessage('Campo cidade não pode ser vazio.'),
    ]

    const save = (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        app.db('bag')
        .insert({ 
                entryDate: req.body.entryDate,
                idLocation: req.body.idLocation, 
                idUser: req.body.idUser, 
                lot: req.body.lot, 
                weight: req.body.weight, 
                producerName: req.body.producerName, 
                producerFarm: req.body.producerFarm, 
                idCity: req.body.idCity })
        .then(function (id) {
            req.body.idTypeCoffe.forEach(typeCoffe => {
                app.db('bagTypeCoffe').insert({ 
                    idTypeCoffe: typeCoffe,
                    idBag: id
                })
                .then(_ => res.status(202).send())
                .catch(err => res.status(500).json(err))
            })
        })
    }

    const get = (req, res) => {
        const limit = Number(req.params.limit)
        const offset = Number(req.params.offset)
        app.db('bag')
            .innerJoin('user', 'bag.idUser', '=', 'user.id')
            .innerJoin('city', 'bag.idCity', '=', 'city.id')
            .innerJoin('location', 'bag.idLocation', '=', 'location.id')
                .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
                .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
                .innerJoin('street', 'location.idStreet', '=', 'street.id')
                .innerJoin('position', 'location.idPosition', '=', 'position.id')
            .select('bag.entryDate as entryDate', 
                    'bag.outDate as outDate', 
                    'bag.id', 'bag.idLocation', 'bag.idUser', 'bag.lot', 
                    'bag.weight', 'bag.producerName', 'bag.producerFarm', 
                    'bag.idCity', 'city.description', 'user.name', 
                    'avenue.description as avenue', 'floor.description as floor', 
                    'street.description as street', 'position.description as position')
            .orderBy('id', 'desc')
            .limit(limit).offset(offset)
            .then(bag => res.json(bag))
            .catch(err => res.status(400).json(err))
    }

    const getById = (req, res) => {

        app.db('bag')
            .innerJoin('user', 'bag.idUser', '=', 'user.id')
            .innerJoin('city', 'bag.idCity', '=', 'city.id')
            .innerJoin('location', 'bag.idLocation', '=', 'location.id')
                .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
                .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
                .innerJoin('position', 'location.idPosition', '=', 'position.id')
                .innerJoin('street', 'location.idStreet', '=', 'street.id')
            .select('bag.entryDate as entryDate', 
                    'bag.outDate as outDate', 
                    'bag.id as idBag', 'bag.idLocation', 'bag.idUser', 'bag.lot', 
                    'bag.weight', 'bag.producerName', 'bag.producerFarm', 
                    'bag.idCity', 'city.description as city', 'user.name', 
                    'avenue.description as avenue', 'floor.description as floor', 
                    'street.description as street', 'position.description as position')
            .where({ 'bag.id': req.params.idBag })
            .limit(1)
            .then(bag => res.json(bag[0]))
            .catch(err => res.status(400).json(err))
    }

    const getByLot = (req, res) => {

        app.db('bag')
            .innerJoin('user', 'bag.idUser', '=', 'user.id')
            .innerJoin('city', 'bag.idCity', '=', 'city.id')
            .innerJoin('location', 'bag.idLocation', '=', 'location.id')
                .innerJoin('avenue', 'location.idAvenue', '=', 'avenue.id')
                .innerJoin('floor', 'location.idFloor', '=', 'floor.id')
                .innerJoin('position', 'location.idPosition', '=', 'position.id')
                .innerJoin('street', 'location.idStreet', '=', 'street.id')
            .select('bag.entryDate as entryDate', 
                    'bag.outDate as outDate', 
                    'bag.id as idBag', 'bag.idLocation', 'bag.idUser', 'bag.lot', 
                    'bag.weight', 'bag.producerName', 'bag.producerFarm', 
                    'bag.idCity', 'city.description as city', 'user.name', 
                    'avenue.description as avenue', 'floor.description as floor', 
                    'street.description as street', 'position.description as position')
            .where({ 'bag.lot': req.params.lotBag })
            .limit(1)
            .then(bag => res.json(bag[0]))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('bag')
            .where({ id: req.body.idBag })
            .update({ 
                idLocation: req.body.idLocation,
                lot: req.body.lot,
                weight: req.body.weight,
                producerName: req.body.producerName,
                producerFarm: req.body.producerFarm,
                idCity: req.body.idCity})
            .then(function () {
                app.db('bagTypeCoffe')
                    .where({ 
                        idBag: req.body.idBag })
                    .del()
                    .then(function () {
                        req.body.idTypeCoffe.forEach(idTypeCoffe => {
                            app.db('bagTypeCoffe').insert({ 
                                idTypeCoffe: idTypeCoffe,
                                idBag: req.body.idBag
                            })
                            .then(_ => res.status(202).send())
                            .catch(err => res.status(500).json(err))
                        })
                    })
            })
    }

    const remove = (req, res) => {
        app.db('bagTypeCoffe')
            .where({ 
                idBag: req.params.idBag })
            .del()
            .then(
                app.db('bag')
                    .where({ id: req.params.idBag })
                    .del()
                    .then(rowsDeleted => {
                        if (rowsDeleted > 0) {
                            const msg = `Deletado a bag # ${req.params.idBag}.`
                            res.status(204).send(msg)
                        } else {
                            const msg = `Não foi encontrado saca com id ${req.params.idBag}.`
                            res.status(400).send(msg)
                        }
                    })
                    .catch(err => res.status(400).json(err))
            )
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, getById, getByLot, save, update, remove }
}