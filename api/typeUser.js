
module.exports = app => {

    const get = (req, res) => {

        app.db('typeUser')
            .orderBy('id', 'desc')
            .then(typeUser => res.json(typeUser))
            .catch(err => res.status(400).json(err))
    }
    
    return { get }
}