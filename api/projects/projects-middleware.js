const Projects = require('./projects-model')

const validateId = async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        if(!project){
            next({ status: 404, message: "Project not found" })
        } else {
            req.validId = project
            next()
        }  
    } catch (err) {
        next(err)
    }
}

const validatePost = (req, res, next) => {
    try {
        if(!req.body.name || !req.body.description){
            next({ status: 400, message: `New projects require a name and description`})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const containsCompleted = (req, res, next) => {
        if(req.body.completed || req.body.completed === false){
            next()
        } else {
            next({ status: 400, message: `Must contain *completed* field with a true or false value`})
        }
}

module.exports = { validateId, validatePost, containsCompleted }