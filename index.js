const express = require('express')
const fs = require('fs')
const app = express()
const port = 80

let rawData = fs.readFileSync('info.json')
let projectData = JSON.parse(rawData)
let projects = projectData.projects

app.get('/', (req, res) => {
  res.send('Hello World 👋')
})

app.get('/projects', (req, res) => {
  res.json(projects)
})

app.get('/projects/:project_name', (req, res) => {
  const projectName = req.params.project_name
  const project = projects.find(p => p.id.toLowerCase() === projectName.toLowerCase())

  if (project) {
    res.json(project)
  } else {
    res.status(404).send('Proyecto no encontrado')
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
