const Actions = require('./actions-model')

const validateAction = async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id)
        if(!action){
            next({ status: 404, message: "No action by that ID" })
        } else {
            next()
        }  
    } catch (err) {
        next(err)
    }
}

const validateNewAction = async (req, res, next) => {
    try {
        const body = req.body
        if(!body.description || !body.notes || !body.project_id){
            next({ status: 400, message: "Please confirm you have a description, notes, and a project_id" })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { validateAction, validateNewAction }