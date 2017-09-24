'use strict';

const express = require('express');
const debug = require('debug')('#APP-Name: server.js');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.listen(PORT, () => {
  console.log('server active on port')
})
