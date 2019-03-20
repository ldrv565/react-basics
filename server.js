const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const todos = require('./api/todos');

let nextId = 4;

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/todos', (req, res) => {
    res.send(todos);
});

app.post('/api/todos', (req, res) => {
    nextId += 1;
    const todo = {
        id: nextId,
        title: req.body.title,
        completed: false,
    };

    todos.push(todo);

    res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(currentTodo => currentTodo.id === req.params.id);

    if (!todo) return res.sendStatus(404);

    todo.title = req.body.title || todo.title;

    res.json(todo);
    return res.sendStatus(204);
});

app.patch('/api/todos/:id', (req, res) => {
    const todo = todos.find(currentTodo => currentTodo.id === req.params.id);

    if (!todo) return res.sendStatus(404);

    todo.completed = !todo.completed;

    res.json(todo);
    return res.sendStatus(204);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(todo => todo.id === req.params.id);

    if (index === -1) return res.sendStatus(404);

    todos.splice(index, 1);

    return res.sendStatus(204);
});

app.get('*', (req, res) => {
    fs.readFile(`${__dirname}/build/index.html`, (error, html) => {
        if (error) throw error;

        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
});

app.listen(app.get('port'));
// , () => console.log(`Server is listening: http://localhost:${app.get('port')}`)
