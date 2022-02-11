const express = require('express')
const router = express.Router()
const { validateId, validatePost, containsCompleted, } = require('./projects-middleware')
const Projects = require('./projects-model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const project = await Projects.get(req.validId.id)
        res.status(200).json(project)  
    } catch (err)
     {
        next(err)
    }
})

router.post('/', validatePost, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(200).json(newProject) 
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateId, validatePost, containsCompleted, async (req, res, next) => {
    try {
        const updated = await Projects.update(req.validId.id, req.body)
        res.status(200).json(updated) 
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Projects.remove(req.validId.id)
        res.status(200).json({ message: 'Action successful'})
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.validId.id)
        res.status(200).json(actions) 
    } catch (err) {
        next(err)
    }
})

module.exports = router