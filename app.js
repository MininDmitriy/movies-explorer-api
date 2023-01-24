require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./helpers/limiter');
const routes = require('./routes/index');
const { handlerErrors } = require('./middlewares/hendlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlerCORS = require('./middlewares/handlerCORS');

const { MONGO } = process.env;

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(handlerCORS);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

mongoose.connect(MONGO, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
