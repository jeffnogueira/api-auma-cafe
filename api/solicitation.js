const { check, validationResult } = require('express-validator/check');

module.exports = app => {

    const validation = [
        check('idForklift').trim().not().isEmpty().withMessage('Campo empilhadeira não pode ser vazio.'),
        check('idBag').trim().not().isEmpty().withMessage('Campo saca não pode ser vazio.'),
    ]

    const save = (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        req.body.dateTime = moment().format('YYYY-MM-DD H:mm:s').replace(/T/, ' ')

        app.db('solicitation')
            .insert({ idStatus: req.body.idStatus, idForklift: req.body.idForklift, 
                idBag: req.body.idBag, idUser: req.user.id, dateTime: req.body.dateTime })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const get = (req, res) => {

        app.db('solicitation')
            .innerJoin('user', 'solicitation.idUser', '=', 'user.id')
            .innerJoin('bag', 'solicitation.idBag', '=', 'bag.id')
            .innerJoin('status', 'solicitation.idStatus', '=', 'status.id')
            .innerJoin('forklift', 'solicitation.idForklift', '=', 'forklift.id')
            .select('solicitation.id as idSolicitation', 
                    'solicitation.id as idSolicitation', 
                    'solicitation.id as idSolicitation', 
                    'solicitation.id as idSolicitation', 
                    'solicitation.id as idSolicitation', 
                    'status.description as descriptionStatus', 
                    'forklift.name as nameForklift', 
                    'bag.lot as lotBag', 'user.name as nameUser' )
            .orderBy('solicitation.id', 'desc')
            .then(solicitation => res.json(solicitation))
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res) => {
        app.db('solicitation')
            .where({ id: req.body.idSolicitation })
            .update({ idStatus: req.body.idStatus })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { validation, get, save, update }
}