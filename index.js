const express = require('express');
const { port } = require('./config');
const routes = require('./routes');
const mongoose = require('./config/db');
const { DB_URI } = process.env;
const cors = require('cors');
const app = express();
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
