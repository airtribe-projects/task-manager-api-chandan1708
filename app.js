const express = require('express');
const TaskRouter = require('./routes/TaskRouter.js');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow all the requests
app.use('/tasks', TaskRouter);

if (require.main === module) {
    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}

module.exports = app;