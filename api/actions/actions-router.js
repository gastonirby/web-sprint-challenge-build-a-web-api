const express = require('express')
const router = express.Router()
const { validateAction, validateNewAction } = require('./actions-middlware')

const Actions = require('./actions-model')

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateAction, async (req, res, next) => {
    try {
        const projAction = await Actions.get(req.params.id)
        res.status(200).json(projAction)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateNewAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(200).json(newAction) 
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateAction, validateNewAction, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateAction, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).json({ Action: `Successfully deleted`}) 
    } catch (err) {
        next(err)
    }
})

module.exports = router