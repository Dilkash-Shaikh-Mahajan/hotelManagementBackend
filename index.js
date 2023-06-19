const express = require('express');
const app = express();
require('dotenv').config();
const mongoConnect = require('./config');
mongoConnect();
const cors = require('cors');
const api = require('./routes');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 8080;
app.use('/api', api);
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
