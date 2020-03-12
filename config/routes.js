module.exports = app => {
    app.post('/signin', app.api.auth.signin)

    app.route('/user')
        //.all(app.config.passport.authenticate())   
        .get(app.api.user.get)
        .post(app.api.user.validation, app.api.user.save)
        .put(app.api.user.validation, app.api.user.update)

    app.route('/user/:idUser')
        //.all(app.config.passport.authenticate())   
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
    
    app.route('/typeuser')
        //.all(app.config.passport.authenticate())   
        .get(app.api.typeUser.get)

    app.route('/bag')
        //.all(app.config.passport.authenticate())   
        .get(app.api.bag.get)
        .post(app.api.bag.validation, app.api.bag.save)
        .put(app.api.bag.update)

    app.route('/bag/:idBag')
        //.all(app.config.passport.authenticate())   
        .get(app.api.bag.getById)
        .delete(app.api.bag.remove)

    app.route('/bagLot/:lotBag')
        //.all(app.config.passport.authenticate())   
        .get(app.api.bag.getByLot)

    app.route('/bag/:limit/:offset')
        //.all(app.config.passport.authenticate())   
        .get(app.api.bag.get)

    app.route('/bagTypeCoffe')
        //.all(app.config.passport.authenticate())   
        .post(app.api.bagTypeCoffe.validation, app.api.bagTypeCoffe.save)
    
    app.route('/bagTypeCoffe/:idBag')
        //.all(app.config.passport.authenticate())   
        .get(app.api.bagTypeCoffe.get)

    app.route('/bagTypeCoffe/:idBag/:idTypeCoffe')
        //.all(app.config.passport.authenticate())   
        .delete(app.api.bagTypeCoffe.remove)

    app.route('/location')
        //.all(app.config.passport.authenticate())   
        .get(app.api.location.get)
        .post(app.api.location.validation, app.api.location.save)
        .put(app.api.location.validation, app.api.location.update)

    app.route('/location/:idLocation')
        //.all(app.config.passport.authenticate())  
        .delete(app.api.location.remove)

    app.route('/locationFree')
        //.all(app.config.passport.authenticate())   
        .get(app.api.location.getFree)




        
    app.route('/forklift')
        //.all(app.config.passport.authenticate())   
        .get(app.api.forklift.get)
        .post(app.api.forklift.validation, app.api.forklift.save)
        .put(app.api.forklift.validation, app.api.forklift.update)

    app.route('/forklift/:idForklift')
        //.all(app.config.passport.authenticate())   
        .get(app.api.forklift.getById)
        .delete(app.api.forklift.remove)

    app.route('/typeCoffe')
        //.all(app.config.passport.authenticate())   
        .get(app.api.typeCoffe.get)
        .post(app.api.typeCoffe.validation, app.api.typeCoffe.save)
        .put(app.api.typeCoffe.validation, app.api.typeCoffe.update)

    app.route('/typeCoffe/:idTypeCoffe')
        //.all(app.config.passport.authenticate())   
        .get(app.api.typeCoffe.getById)
        .delete(app.api.typeCoffe.remove)

    app.route('/street')
        //.all(app.config.passport.authenticate())   
        .get(app.api.street.get)
        .post(app.api.street.validation, app.api.street.save)
        .put(app.api.street.validation, app.api.street.update)
        
    app.route('/street/:idStreet')
        //.all(app.config.passport.authenticate())   
        .delete(app.api.street.remove)

    app.route('/avenue')
        //.all(app.config.passport.authenticate())   
        .get(app.api.avenue.get)
        .post(app.api.avenue.validation, app.api.avenue.save)
        .put(app.api.avenue.validation, app.api.avenue.update)
        
    app.route('/avenue/:idAvenue')
        //.all(app.config.passport.authenticate())   
        .delete(app.api.avenue.remove)

    app.route('/position')
        //.all(app.config.passport.authenticate())   
        .get(app.api.position.get)
        .post(app.api.position.validation, app.api.position.save)
        .put(app.api.position.validation, app.api.position.update)
        
    app.route('/position/:idPosition')
        //.all(app.config.passport.authenticate())   
        .delete(app.api.position.remove)
    
    app.route('/city')
        //.all(app.config.passport.authenticate())   
        .get(app.api.city.get)
    
    app.route('/location')
        //.all(app.config.passport.authenticate())   
        .get(app.api.location.get)
        .post(app.api.location.validation, app.api.location.save)
        .put(app.api.location.validation, app.api.location.update)

    app.route('/location/:idLocation')
        //.all(app.config.passport.authenticate())  
        .delete(app.api.location.remove)
    
    app.route('/solicitation')
        //.all(app.config.passport.authenticate())   
        .get(app.api.solicitation.get)
        .post(app.api.solicitation.validation, app.api.solicitation.save)
        .put(app.api.solicitation.update)

}