const express = require('express');
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

const server = express();

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.get('/', (req, res) => {
    res.send(`<h2> Here goes nothin </h2>`)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} is not a valid address`})
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: ` Error: ${err.message}`})
})

module.exports = server;