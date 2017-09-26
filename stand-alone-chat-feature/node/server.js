'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')(`${process.env.APP_NAME}: Server`);

const PORT = process.env.PORT || 3000;
const app = express();

const errorMiddleware = require('./lib/error.js');
const userRouter = require('./router/user-router.js');
const profileRouter = require('./router/profile-router.js');

mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(userRouter);
app.use(profileRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  debug(`Server active on port : ${PORT}`);
});
