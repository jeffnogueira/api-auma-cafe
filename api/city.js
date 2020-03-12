module.exports = app => {

    const get = (req, res) => {

        app.db('city')
            .orderBy('description', 'asc')
            .then(city => res.json(city))
            .catch(err => res.status(400).json(err))
    }

    return { get }
}