
let express = require('express');
let app = express();

let { projects } = require('./data.json');

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
    console.log('Rendering index');
});

app.get('/about', (req, res) => {
    res.render('about');
    console.log('Rendering about');
});

app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (project) {
        res.render('project', { project });
        console.log('Rendering project');
    } else {
        res.sendStatus(404);
    }
});

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: error
      });
});

let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server listening on port 3000');
});

module.exports = app;

