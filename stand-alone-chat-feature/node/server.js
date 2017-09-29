'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const debug = require('debug')(`${process.env.APP_NAME}: Server`);

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);

const errorMiddleware = require('./lib/error.js');
const userRouter = require('./router/user-router.js');
const profileRouter = require('./router/profile-router.js');
const socketRouter = require('./socket-routers/socket-router.js');

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(userRouter);
app.use(profileRouter);
app.use(errorMiddleware);

socketRouter(server);



server.listen(PORT, () => {
  debug(`Server active on port : ${PORT}`);
});
