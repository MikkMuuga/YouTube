const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend OK'));
app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
