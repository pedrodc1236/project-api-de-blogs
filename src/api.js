const express = require('express');

// ...

const loginRouter = require('./routes/loginRoute');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
